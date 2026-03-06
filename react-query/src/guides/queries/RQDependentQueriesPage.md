# RQDependentQueriesPage Component

## Overview

Demonstrates **dependent queries** where one query depends on data from another query (sequential fetching).

## Purpose

- Fetch user by email
- Then fetch user's courses using channelId from user data
- Show how to chain queries sequentially

## Use Case Examples

### Real-World Scenarios

1. **User Profile → User Posts**: Fetch user, then their posts
2. **Order → Order Items**: Get order details, then line items
3. **Category → Products**: Fetch category, then products in that category
4. **Auth → User Data**: Get auth token, then user profile
5. **This Example**: User email → channelId → courses

## Key Concept: `enabled` Option

The `enabled` option controls when a query should run:

```jsx
const { data: courses } = useQuery({
  queryKey: ["courses", channelId],
  queryFn: () => fetchCourses(channelId),
  enabled: !!channelId, // Only run if channelId exists
});
```

## Implementation

```jsx
function RQDependentQueriesPage({ emailId }) {
  // Query 1: Fetch user
  const { data: user } = useQuery({
    queryKey: ["user", emailId],
    queryFn: () => fetchUserByEmail(emailId),
  });

  const channelId = user?.channelId;

  // Query 2: Fetch courses (depends on channelId from Query 1)
  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId, // ⭐ Key: Only run when channelId exists
  });

  return (
    <div>
      <p>User: {user?.id}</p>
      <p>Channel: {user?.channelId}</p>
      <ul>
        {courses?.courses.map((course) => (
          <li>{course}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Execution Flow

```
Component mounts
    ↓
Query 1 starts: fetchUserByEmail('madhu@example.com')
    ↓
⏳ channelId = undefined
    ↓
Query 2 is DISABLED (enabled: !!channelId = false)
    ↓
User data arrives: { id: 'madhu@example.com', channelId: 'frontendmasters' }
    ↓
channelId = 'frontendmasters'
    ↓
Query 2 ENABLED (enabled: !!channelId = true)
    ↓
Query 2 starts: fetchCoursesByChannelId('frontendmasters')
    ↓
Courses data arrives: { id: 'frontendmasters', courses: ['react', 'vue', 'angular'] }
    ↓
Display both user and courses
```

## Key Points

### 1. **Sequential Execution**

```
Step 1: Fetch user      (500ms)
Step 2: Wait for user data
Step 3: Extract channelId
Step 4: Fetch courses   (500ms)
Total: 1000ms
```

### 2. **enabled: !!channelId**

The `!!` (double bang) converts to boolean:

```jsx
!!undefined; // false → Query disabled
!!null; // false → Query disabled
!!"value"; // true  → Query enabled
```

### 3. **Prevents Failed Requests**

Without `enabled`:

```jsx
// ❌ Without enabled
queryFn: () => fetchCourses(channelId);
// When channelId is undefined, makes request to:
// GET http://localhost:4000/channels/undefined  ← 404 Error!
```

With `enabled`:

```jsx
// ✅ With enabled
enabled: !!channelId;
// Query doesn't run until channelId exists
// No failed requests!
```

## Caching Strategy

### Cache Keys

```jsx
["user", "madhu@example.com"][("courses", "frontendmasters")]; // User cache // Courses cache
```

### Configuration

```jsx
staleTime: 1000 * 60 * 5,          // 5 minutes
refetchOnMount: false,              // Don't refetch on component mount
refetchOnWindowFocus: false,        // Don't refetch on window focus
```

### Why These Settings?

- User data rarely changes → Long staleTime
- Courses rarely change → Don't refetch often
- Prevents unnecessary API calls on navigation

## API Endpoints

```
GET http://localhost:4000/users?id=madhu@example.com
GET http://localhost:4000/channels?id=frontendmasters
```

## Data Flow

```json
// Step 1: Fetch user
GET /users?id=madhu@example.com
Response: [{
  "id": "madhu@example.com",
  "channelId": "frontendmasters"
}]

// Step 2: Extract channelId
channelId = "frontendmasters"

// Step 3: Fetch courses
GET /channels?id=frontendmasters
Response: [{
  "id": "frontendmasters",
  "courses": ["react", "vue", "angular"]
}]
```

## Benefits vs Drawbacks

### Benefits

- ✅ **Data integrity** - Ensures valid channelId before fetching
- ✅ **No failed requests** - enabled prevents bad API calls
- ✅ **Type safety** - channelId is always defined when courses query runs

### Drawbacks

- ❌ **Slower** - Sequential (1000ms) vs Parallel (500ms)
- ❌ **Use only when necessary** - Prefer parallel when possible

## When to Use Dependent Queries

Use when Query 2 **requires data** from Query 1:

- ✅ User ID needed to fetch user posts
- ✅ Category ID needed to fetch products
- ✅ Auth token needed for protected endpoints

Don't use when queries are independent:

- ❌ Fetching unrelated data (use parallel queries instead)

## Related Files

- `RQParallelQueries.jsx` - Independent parallel queries
- `RQDynamicParallelQueries.jsx` - Dynamic parallel queries
