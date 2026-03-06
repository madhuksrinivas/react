# RQPaginationQueriesPage Component

## Overview

Implements **paginated data fetching** with React Query, allowing users to navigate through pages of data.

## Purpose

- Display data in chunks (pages)
- Navigate between pages with Previous/Next buttons
- Cache each page separately
- Smooth transitions with `keepPreviousData`

## Use Case Examples

- Product listings
- Search results
- User tables
- Blog posts
- Any large dataset split into pages

## Implementation

```jsx
function RQPaginationQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    keepPreviousData: true, // ⭐ Key feature
  });

  return (
    <div>
      {data?.data?.map((color) => (
        <p>{color.label}</p>
      ))}

      <button
        onClick={() => setPageNumber((p) => p - 1)}
        disabled={data?.prev === null}
      >
        Previous
      </button>

      <span>
        Page {pageNumber} of {data?.pages}
      </span>

      <button
        onClick={() => setPageNumber((p) => p + 1)}
        disabled={data?.next === null}
      >
        Next
      </button>
    </div>
  );
}
```

## Key Feature: `keepPreviousData`

### Problem Without keepPreviousData

```jsx
// Click "Next Page"
User sees: Page 1 data
Click Next
    ↓
User sees: Loading... (blank screen) 😢
    ↓
User sees: Page 2 data
```

### Solution With keepPreviousData

```jsx
keepPreviousData: true

// Click "Next Page"
User sees: Page 1 data
Click Next
    ↓
User sees: Page 1 data (grayed out) + "Updating..." 😊
    ↓
User sees: Page 2 data (smooth transition)
```

## API Response Structure

```json
{
  "first": 1,
  "prev": 1,
  "next": 3,
  "last": 4,
  "pages": 4,
  "items": 8,
  "data": [
    { "id": "3", "label": "green" },
    { "id": "4", "label": "yellow" }
  ]
}
```

## JSON-Server Pagination

### URL Pattern

```bash
GET http://localhost:4000/colors?_page=2&_per_page=2
```

### Parameters

- `_page` - Page number (1-based)
- `_per_page` - Items per page

### Examples

```bash
# Page 1 (items 1-2)
GET /colors?_page=1&_per_page=2
# Returns: red, blue

# Page 2 (items 3-4)
GET /colors?_page=2&_per_page=2
# Returns: green, yellow

# Page 3 (items 5-6)
GET /colors?_page=3&_per_page=2
# Returns: black, white
```

## Caching Strategy

### Each Page Has Separate Cache

```jsx
["colors", 1][("colors", 2)][("colors", 3)][("colors", 4)]; // Page 1 cache // Page 2 cache // Page 3 cache // Page 4 cache
```

### Navigation Flow

```
User on Page 1
    ↓
Click "Next"
    ↓
setPageNumber(2)
    ↓
queryKey changes to ['colors', 2]
    ↓
Check cache for ['colors', 2]
    ├─ Found: Use cached data instantly
    └─ Not found: Fetch from API
```

## Button Disable Logic

### Previous Button

```jsx
disabled={data?.prev === null || pageNumber === 1}
```

- Disabled on first page
- `data.prev === null` from API
- `pageNumber === 1` as backup

### Next Button

```jsx
disabled={data?.next === null}
```

- Disabled on last page
- API returns `next: null` when no more pages

## Benefits

### 1. **Smooth UX**

- No blank screens between pages
- Previous data visible while loading new page
- Clear "Updating..." indicator

### 2. **Efficient Loading**

- Each page cached separately
- Revisiting pages uses cache (instant load)
- Only fetch when needed

### 3. **Server-Side Pagination**

- Only loads what's needed
- Reduces bandwidth
- Works with large datasets

## Complete Flow Example

```
Initial Load (Page 1)
    ↓
Fetch /colors?_page=1&_per_page=2
    ↓
Cache: ['colors', 1] = {data: [red, blue], next: 2, prev: null}
    ↓
Display: red, blue
    ↓
User clicks "Next"
    ↓
setPageNumber(2)
    ↓
keepPreviousData: Still shows red, blue (grayed)
    ↓
Fetch /colors?_page=2&_per_page=2
    ↓
Cache: ['colors', 2] = {data: [green, yellow], next: 3, prev: 1}
    ↓
Display: green, yellow
    ↓
User clicks "Previous"
    ↓
setPageNumber(1)
    ↓
Check cache ['colors', 1]
    ↓
Cache HIT! Instant display: red, blue
```

## Comparison: Pagination vs Infinite Scroll

| Feature        | Pagination                  | Infinite Scroll                       |
| -------------- | --------------------------- | ------------------------------------- |
| Navigation     | Previous/Next buttons       | Scroll to load more                   |
| Cache          | Separate page caches        | Single accumulated cache              |
| Use Case       | Tables, search results      | Social feeds, image galleries         |
| Data Structure | `{ pages: 4, data: [...] }` | `{ pages: [...], pageParams: [...] }` |
| Component      | `useQuery` + state          | `useInfiniteQuery`                    |

## API Endpoint

```
GET http://localhost:4000/colors?_page=${pageNumber}&_per_page=2
```

## Related Files

- `RQInfiniteQueries.jsx` - Infinite scroll alternative
- `useSuperHeroesQuery.js` - Custom hook example
