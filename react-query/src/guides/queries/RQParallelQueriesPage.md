## Parallel Queries in React Query

This component demonstrates how to execute **multiple independent queries simultaneously** using React Query.

### 🎯 What are Parallel Queries?

Parallel queries are multiple `useQuery` hooks running at the same time to fetch different data from different endpoints. They execute **independently** and **concurrently**, which improves performance compared to sequential fetching.

### 📝 Component Code Breakdown:

```javascript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = () => axios.get("http://localhost:4000/superheroes");
const fetchFriends = () => axios.get("http://localhost:4000/friends");

export default function RQParallelQueriesPage() {
  // Query 1: Fetch superheroes
  const { data: superHeros } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeros,
  });
  
  // Query 2: Fetch friends
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });
  
  // Render both datasets side by side
  return (
    <div>
      <h2>RQParallelQueriesPage</h2>
      <div style={{ display: "flex", gap: "50px" }}>
        {/* SuperHeros List */}
        <div>
          <p>SuperHeros</p>
          <ul>
            {superHeros?.data?.map((hero) => (
              <li key={hero.id}>{hero.name}</li>
            ))}
          </ul>
        </div>
        
        {/* Friends List */}
        <div>
          <p>Friends</p>
          <ul>
            {friends?.data?.map((friend) => (
              <li key={friend.id}>{friend.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

### 🚀 How Parallel Queries Work:

#### **Sequential vs Parallel Fetching:**

**❌ Sequential (Traditional Way):**
```
Fetch Superheroes → Wait → Complete → Fetch Friends → Wait → Complete
Total Time: 2 seconds + 1 second = 3 seconds
```

**✅ Parallel (React Query Way):**
```
Fetch Superheroes → Wait → Complete (2s)
     ↓
Fetch Friends     → Wait → Complete (1s)

Total Time: max(2s, 1s) = 2 seconds (both start together!)
```

### 📊 Visual Flow:

```
Component Mounts
       ↓
┌──────────────────────────────────────────┐
│  React Query Initiates Both Queries     │
└──────────────────────────────────────────┘
       ↓                    ↓
┌─────────────┐      ┌─────────────┐
│ Query 1     │      │ Query 2     │
│ Superheroes │      │ Friends     │
│             │      │             │
│ Status:     │      │ Status:     │
│ • loading   │      │ • loading   │
└─────────────┘      └─────────────┘
       ↓                    ↓
  API Call 1           API Call 2
  (Concurrent!)        (Concurrent!)
       ↓                    ↓
┌─────────────┐      ┌─────────────┐
│ ✓ Success   │      │ ✓ Success   │
│ Data ready  │      │ Data ready  │
└─────────────┘      └─────────────┘
       ↓                    ↓
    Render Both Lists Side by Side
```

### 🔑 Key Features:

#### 1. **Destructuring with Aliases**
```javascript
const { data: superHeros } = useQuery({...});
const { data: friends } = useQuery({...});
```
- Without aliases, you'd have two variables named `data` (conflict!)
- Aliases let you rename properties to avoid naming collisions

#### 2. **Independent Queries**
```javascript
// Each query has its own:
• queryKey: ["super-heroes"] vs ["friends"]
• queryFn: fetchSuperHeros() vs fetchFriends()
• State: loading, error, success states are separate
• Cache: Stored independently in React Query cache
```

#### 3. **Concurrent Execution**
- Both queries start **at the same time** when component mounts
- No dependency between them (neither waits for the other)
- Faster overall load time

### 💡 Full State Management Example:

```javascript
export default function RQParallelQueriesPage() {
  const { 
    data: superHeros, 
    isLoading: isLoadingHeroes,
    error: heroesError 
  } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeros,
  });
  
  const { 
    data: friends, 
    isLoading: isLoadingFriends,
    error: friendsError 
  } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  if (isLoadingHeroes || isLoadingFriends) {
    return <div>Loading...</div>;
  }

  if (heroesError) return <div>Error fetching heroes: {heroesError.message}</div>;
  if (friendsError) return <div>Error fetching friends: {friendsError.message}</div>;

  return (
    // Render both lists
  );
}
```

### 🆚 Parallel vs Dependent Queries:

| Feature | Parallel Queries | Dependent Queries |
|---------|-----------------|-------------------|
| **Execution** | Simultaneous | Sequential |
| **Dependency** | Independent | Second depends on first |
| **Use Case** | Fetch unrelated data | Fetch related data (e.g., user → user posts) |
| **Performance** | Faster (concurrent) | Slower (wait for first) |
| **Example** | Heroes + Friends | User ID → User Details |

### 🎯 When to Use Parallel Queries:

✅ **Good Use Cases:**
- Dashboard with multiple widgets (users, stats, notifications)
- Profile page (user info + posts + followers)
- E-commerce (products + categories + cart)
- **Any time you need multiple independent datasets**

❌ **Don't Use When:**
- Second query needs data from first query (use **Dependent Queries**)
- Queries should run conditionally based on user action (use **enabled** option)

### 📌 Important Notes:

1. **No Limit on Parallel Queries**
   ```javascript
   const query1 = useQuery({...});
   const query2 = useQuery({...});
   const query3 = useQuery({...});
   const query4 = useQuery({...});
   // All run in parallel!
   ```

2. **Each Query Has Its Own State**
   - If one fails, the other still succeeds
   - Loading states are independent
   - Refetching one doesn't affect the other

3. **Cache Keys Must Be Unique**
   ```javascript
   // ❌ BAD - Same key!
   useQuery({ queryKey: ["data"], queryFn: fetchHeroes });
   useQuery({ queryKey: ["data"], queryFn: fetchFriends });
   
   // ✅ GOOD - Unique keys
   useQuery({ queryKey: ["heroes"], queryFn: fetchHeroes });
   useQuery({ queryKey: ["friends"], queryFn: fetchFriends });
   ```

### 🔧 Advanced Pattern - useQueries:

For **dynamic number** of parallel queries, use `useQueries`:

```javascript
import { useQueries } from "@tanstack/react-query";

const ids = [1, 2, 3];

const results = useQueries({
  queries: ids.map(id => ({
    queryKey: ['hero', id],
    queryFn: () => fetchHero(id),
  }))
});

// results is an array of query results
results.forEach(result => console.log(result.data));
```

### 🎨 Real-World Example:

```javascript
// Dashboard Component
function Dashboard() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: analytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const { data: sales } = useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
  });

  // All 4 queries run in parallel!
  // Dashboard loads faster 🚀
}
```

### 🌟 Benefits:

1. **Performance**: Faster page loads (concurrent requests)
2. **Simple Code**: Just use multiple `useQuery` hooks
3. **Independent States**: Each query manages its own state
4. **Better UX**: Show partial data while other queries load

This pattern is one of the most common and powerful features of React Query! 🎯
