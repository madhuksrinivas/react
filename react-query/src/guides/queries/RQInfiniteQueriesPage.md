# RQInfiniteQueriesPage Component

## Overview

Implements **infinite scroll** pagination using `useInfiniteQuery`, allowing users to load more data continuously.

## Purpose

- Load data in chunks as user scrolls
- Accumulate all loaded pages in a single list
- "Load More" button to fetch next page
- Smooth UX with continuous data loading

## Use Case Examples

- Social media feeds (Twitter, Instagram)
- Image galleries
- Product catalogs
- News feeds
- Comment sections

## Key Difference: Pagination vs Infinite Queries

### Pagination (useQuery)

```jsx
Page 1: [red, blue]
Click "Next"
Page 2: [green, yellow]  // Replaces Page 1
```

### Infinite Scroll (useInfiniteQuery)

```jsx
Page 1: [red, blue]
Click "Load More"
Pages 1+2: [red, blue, green, yellow]  // Accumulates
Click "Load More"
Pages 1+2+3: [red, blue, green, yellow, black, white]  // Keeps accumulating
```

## Implementation

```jsx
function RQInfiniteQueriesPage() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["colors"],
      queryFn: fetchColors,
      getNextPageParam: (latestPage) => {
        // latestPage = The page we JUST fetched
        // Return next page number or undefined to stop
        return latestPage.next ?? undefined;
      },
    });

  return (
    <div>
      {/* Display ALL loaded pages */}
      {data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.data.map((color) => (
            <h2 key={color.id}>{color.label}</h2>
          ))}
        </Fragment>
      ))}

      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
```

## Core Concept: `getNextPageParam`

This function determines what page to fetch next:

```jsx
getNextPageParam: (latestPage, allPages) => {
  // latestPage: The page response we JUST received from the API
  // allPages: Array of all page responses fetched so far

  // Return next page number OR undefined to stop
  return latestPage.next ?? undefined;
};
```

### 🚨 Important: Understanding `latestPage` vs "Last Page"

**Common Confusion:** The parameter is often called `lastPage` in documentation, which is misleading!

- ❌ **Don't think:** "The final page of all data"
- ✅ **Do think:** "The most recent page we just fetched"

Better mental model:

```javascript
getNextPageParam: (latestPage, allPages) => {
  // latestPage = The page we JUST got back from the API
  // NOT the final page in the dataset!
};
```

### How It Works

#### Initial Load (Page 1)

```jsx
// Component mounts
fetchColors({ pageParam: 1 })
    ↓
API Response (this is latestPage):
{
  first: 1,
  prev: null,
  next: 2,        // ← getNextPageParam returns this
  last: 4,
  pages: 4,
  data: [
    { id: "1", label: "red" },
    { id: "2", label: "blue" }
  ]
}
    ↓
getNextPageParam(latestPage) returns: 2
    ↓
hasNextPage = true (because we returned a value)
```

#### Load More Clicked (Page 1 → Page 2)

```jsx
// User clicks "Load More"
fetchColors({ pageParam: 2 })
    ↓
API Response (this is latestPage - the one we JUST fetched):
{
  first: 1,
  prev: 1,
  next: 3,        // ← Returns 3 (next page to load)
  last: 4,
  pages: 4,
  data: [
    { id: "3", label: "green" },
    { id: "4", label: "yellow" }
  ]
}
    ↓
allPages at this point:
[
  { /* Page 1 data */ },
  { /* Page 2 data (latestPage is here!) */ }
]
    ↓
getNextPageParam(latestPage) returns: 3
    ↓
hasNextPage = true
```

#### Load More Clicked (Page 3 → Page 4)

```jsx
// User clicks "Load More" again
fetchColors({ pageParam: 4 })
    ↓
API Response (latestPage - we JUST fetched page 4):
{
  first: 1,
  prev: 3,
  next: null,     // ← No more pages!
  last: 4,
  pages: 4,
  data: [
    { id: "7", label: "orange" },
    { id: "8", label: "purple" }
  ]
}
    ↓
allPages now contains all 4 pages:
[
  { /* Page 1 */ },
  { /* Page 2 */ },
  { /* Page 3 */ },
  { /* Page 4 (latestPage) */ }
]
    ↓
getNextPageParam(latestPage) returns: undefined (because next is null)
    ↓
hasNextPage = false
    ↓
"Load More" button disabled
```

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ INITIAL LOAD                                            │
├─────────────────────────────────────────────────────────┤
│ Fetch Page 1                                            │
│   ↓                                                     │
│ latestPage = Page 1 data (prev: null, next: 2)        │
│ allPages = [Page 1]                                     │
│   ↓                                                     │
│ getNextPageParam returns: 2                             │
│ hasNextPage: true                                       │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ CLICK "LOAD MORE" #1                                    │
├─────────────────────────────────────────────────────────┤
│ Fetch Page 2                                            │
│   ↓                                                     │
│ latestPage = Page 2 data (prev: 1, next: 3)           │
│              ^^^^^^^^^ THIS is the "latest" page        │
│ allPages = [Page 1, Page 2]                             │
│   ↓                                                     │
│ getNextPageParam returns: 3                             │
│ hasNextPage: true                                       │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ CLICK "LOAD MORE" #2                                    │
├─────────────────────────────────────────────────────────┤
│ Fetch Page 3                                            │
│   ↓                                                     │
│ latestPage = Page 3 data (prev: 2, next: 4)           │
│ allPages = [Page 1, Page 2, Page 3]                     │
│   ↓                                                     │
│ getNextPageParam returns: 4                             │
│ hasNextPage: true                                       │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ CLICK "LOAD MORE" #3 (FINAL PAGE)                      │
├─────────────────────────────────────────────────────────┤
│ Fetch Page 4                                            │
│   ↓                                                     │
│ latestPage = Page 4 data (prev: 3, next: null)        │
│              ^^^^^^^^^ Now it's BOTH latest AND final   │
│ allPages = [Page 1, Page 2, Page 3, Page 4]            │
│   ↓                                                     │
│ getNextPageParam returns: undefined                     │
│ hasNextPage: false                                      │
│ Button disabled ✓                                       │
└─────────────────────────────────────────────────────────┘
```

## Data Structure

### Response Format

```javascript
data = {
  pages: [
    // Page 1 (first fetch)
    {
      first: 1,
      prev: null,
      next: 2,
      last: 4,
      pages: 4,
      items: 8,
      data: [
        { id: "1", label: "red" },
        { id: "2", label: "blue" },
      ],
    },
    // Page 2 (second fetch - this was latestPage when loaded)
    {
      first: 1,
      prev: 1,
      next: 3,
      last: 4,
      pages: 4,
      items: 8,
      data: [
        { id: "3", label: "green" },
        { id: "4", label: "yellow" },
      ],
    },
    // ... more pages as they're loaded
  ],
  pageParams: [1, 2, 3, 4], // Page numbers that were fetched
};
```

### Rendering All Pages

```jsx
{
  data?.pages.map((group, index) => (
    <Fragment key={index}>
      {group.data.map((color) => (
        <h2 key={color.id}>{color.label}</h2>
      ))}
    </Fragment>
  ));
}
```

## Fetch Function

```jsx
const fetchColors = async ({ pageParam = 1 }) => {
  // pageParam comes from getNextPageParam's return value
  const response = await axios.get(
    `http://localhost:4000/colors?_page=${pageParam}&_per_page=2`
  );
  return response.data;
};
```

### Parameter Flow

```
Initial load:
  pageParam = 1 (default value)
  ↓
After getNextPageParam returns 2:
  fetchColors called with: { pageParam: 2 }
  ↓
After getNextPageParam returns 3:
  fetchColors called with: { pageParam: 3 }
  ↓
After getNextPageParam returns undefined:
  No more fetches (hasNextPage = false)
```

## Understanding `allPages` Array

The `allPages` parameter gives you access to ALL pages fetched so far:

```javascript
// Example when on Page 3
allPages = [
  { data: [...], next: 2 },    // Page 1
  { data: [...], next: 3 },    // Page 2
  { data: [...], next: 4 },    // Page 3 (also the latestPage)
]

// You can use this to:
// 1. Count total items loaded
const totalItems = allPages.reduce((sum, page) => sum + page.data.length, 0);

// 2. Stop after certain number of pages
if (allPages.length >= 5) return undefined;

// 3. Check if we already have enough data
if (totalItems >= 100) return undefined;
```

## Loading States

### `isFetching`

- `true` whenever ANY fetch is happening
- Includes initial load, background refetch, or next page

### `isFetchingNextPage`

- `true` specifically when loading next page via `fetchNextPage()`
- Used for "Load More" button state

### `isLoading`

- `true` only during the initial load
- `false` after first page is loaded

### Usage

```jsx
<button disabled={!hasNextPage || isFetchingNextPage} onClick={fetchNextPage}>
  {isFetchingNextPage
    ? "Loading..."
    : hasNextPage
    ? "Load More"
    : "No More Data"}
</button>;

{
  isFetching && !isFetchingNextPage && (
    <p>🔄 Refreshing data in background...</p>
  );
}
```

## Alternative: Hardcoded Page Limit

Instead of using API's `next` field, you can manually control pagination:

```jsx
getNextPageParam: (latestPage, allPages) => {
  // Stop after 4 pages regardless of API response
  if (allPages.length < 4) {
    return allPages.length + 1; // Next page number
  }
  return undefined; // Stop fetching
};
```

### When to use manual control:

- API doesn't provide pagination metadata
- You want to limit pages for performance
- Testing with fixed page count

## Benefits

### 1. **Continuous Scrolling UX**

- Natural browsing experience
- All data visible in one list
- No pagination clicks needed

### 2. **Data Accumulation**

- All loaded pages stay in view
- Easy to scroll back up
- Single continuous list

### 3. **Smart Caching**

- All pages cached together under `['colors']`
- Efficient memory usage
- Fast revisits

### 4. **Progressive Loading**

- Load data as needed
- Better initial page load
- Reduced bandwidth on first visit

## Complete Flow Example

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Initial Mount
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
fetchColors({ pageParam: 1 })
    ↓
GET /colors?_page=1&_per_page=2
    ↓
Response (latestPage):
{
  next: 2,
  data: [
    { id: "1", label: "red" },
    { id: "2", label: "blue" }
  ]
}
    ↓
getNextPageParam(latestPage, [latestPage])
    ↓
Returns: 2
    ↓
hasNextPage = true
    ↓
Display: red, blue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2: User clicks "Load More"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
fetchNextPage() called
    ↓
isFetchingNextPage = true
    ↓
fetchColors({ pageParam: 2 })
    ↓
GET /colors?_page=2&_per_page=2
    ↓
Response (latestPage):
{
  next: 3,
  data: [
    { id: "3", label: "green" },
    { id: "4", label: "yellow" }
  ]
}
    ↓
data.pages = [
  { data: [red, blue] },
  { data: [green, yellow] }  ← latestPage
]
    ↓
getNextPageParam(latestPage, allPages)
    ↓
Returns: 3
    ↓
hasNextPage = true
    ↓
Display: red, blue, green, yellow

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3: Continue until final page...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
fetchColors({ pageParam: 4 })
    ↓
Response (latestPage):
{
  next: null,  ← No more pages!
  data: [
    { id: "7", label: "orange" },
    { id: "8", label: "purple" }
  ]
}
    ↓
getNextPageParam(latestPage, allPages)
    ↓
Returns: undefined (because next is null)
    ↓
hasNextPage = false
    ↓
"Load More" button disabled ✓
```

## Comparison: Pagination vs Infinite Queries

| Feature         | Pagination              | Infinite Scroll             |
| --------------- | ----------------------- | --------------------------- |
| Navigation      | Previous/Next buttons   | "Load More" button          |
| Data Display    | Replaces current page   | Accumulates all pages       |
| Cache Structure | Separate cache per page | Single cache with all pages |
| Query Hook      | `useQuery`              | `useInfiniteQuery`          |
| Use Case        | Tables, search results  | Feeds, galleries            |
| Data Structure  | `{ data: [...] }`       | `{ pages: [...] }`          |
| Page Param      | State variable          | `getNextPageParam` return   |
| Best For        | Structured navigation   | Continuous browsing         |

## API Endpoint

```
GET http://localhost:4000/colors?_page=${pageParam}&_per_page=2
```

### JSON-Server Pagination Response

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

## Common Pitfalls

### ❌ Mistake 1: Thinking latestPage is the final page

```javascript
// WRONG assumption
getNextPageParam: (latestPage) => {
  // latestPage is NOT the final page of all data!
  // It's the page we just fetched
};
```

### ❌ Mistake 2: Not handling undefined

```javascript
// WRONG - might cause infinite loop
getNextPageParam: (latestPage) => {
  return latestPage.next; // Returns null, not undefined!
};

// CORRECT - use nullish coalescing
getNextPageParam: (latestPage) => {
  return latestPage.next ?? undefined;
};
```

### ❌ Mistake 3: Forgetting key prop

```javascript
// WRONG - React warning
{data?.pages.map((group) => (
  {group.data.map(color => <div>{color.label}</div>)}
))}

// CORRECT - use Fragment with key
{data?.pages.map((group, index) => (
  <Fragment key={index}>
    {group.data.map(color => <div key={color.id}>{color.label}</div>)}
  </Fragment>
))}
```

## Related Files

- `RQPaginationQueries.jsx` - Traditional pagination alternative
- `useSuperHeroesQuery.js` - Custom hook pattern
- `RQDynamicParallelQueries.jsx` - Multiple queries pattern

## How `pageParam` is Passed to `fetchColors`

### 🔑 Key Understanding: React Query Passes `pageParam` Automatically

You might notice that `fetchColors` receives `pageParam` without you explicitly passing it:

```jsx
const fetchColors = async ({ pageParam = 1 }) => {
  // Where does pageParam come from? 🤔
  return axios.get(`http://localhost:4000/colors?_page=${pageParam}&_per_page=2`)
};
```

**Answer: React Query automatically passes it to your `queryFn`!**

### The Flow

```
┌─────────────────────────────────────────────────────────┐
│ INITIAL MOUNT                                           │
├─────────────────────────────────────────────────────────┤
│ React Query has no pageParam yet                        │
│   ↓                                                     │
│ Calls: fetchColors({ pageParam: undefined })           │
│   ↓                                                     │
│ Default param activates: pageParam = 1                  │
│   ↓                                                     │
│ Fetches: GET /colors?_page=1&_per_page=2              │
│   ↓                                                     │
│ Response: { next: 2, data: [...] }                     │
│   ↓                                                     │
│ getNextPageParam(response) returns: 2                   │
│   ↓                                                     │
│ React Query stores: nextPageParam = 2                   │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ USER CLICKS "LOAD MORE"                                 │
├─────────────────────────────────────────────────────────┤
│ fetchNextPage() is called                               │
│   ↓                                                     │
│ React Query uses stored value                           │
│ Calls: fetchColors({ pageParam: 2 })                   │
│        ↑                                                │
│        From getNextPageParam's previous return!         │
│   ↓                                                     │
│ Fetches: GET /colors?_page=2&_per_page=2              │
│   ↓                                                     │
│ Response: { next: 3, data: [...] }                     │
│   ↓                                                     │
│ getNextPageParam(response) returns: 3                   │
│   ↓                                                     │
│ React Query stores: nextPageParam = 3                   │
└─────────────────────────────────────────────────────────┘
```

### Key Points

1. **You don't pass `pageParam` manually** - React Query handles it
2. **Default parameter `= 1`** - Essential for initial load when React Query passes `undefined`
3. **`getNextPageParam` controls the next value** - Its return value becomes the next `pageParam`

### React Query's Internal Logic (Simplified)

```javascript
// Pseudocode of what React Query does internally:
class InfiniteQuery {
  constructor() {
    this.nextPageParam = undefined;
  }
  
  // Initial fetch
  async fetchInitialPage() {
    const result = await queryFn({ pageParam: undefined });
    // Your default param makes it: pageParam = 1
    
    this.nextPageParam = getNextPageParam(result, [result]);
    // Stores the return value (e.g., 2)
  }
  
  // When user clicks "Load More"
  async fetchNextPage() {
    const result = await queryFn({ pageParam: this.nextPageParam });
    // Uses the stored value from previous getNextPageParam
    
    this.nextPageParam = getNextPageParam(result, allPages);
  }
}
```

### Where Values Come From

| Load # | `pageParam` Value | Source |
|--------|------------------|---------|
| Load 1 (Initial) | `1` | Default parameter (`pageParam = 1`) |
| Load 2 | `2` | From `getNextPageParam` returning `2` |
| Load 3 | `3` | From `getNextPageParam` returning `3` |
| Load 4 | `4` | From `getNextPageParam` returning `4` |
| Load 5 | N/A | `getNextPageParam` returned `undefined`, no more loads |

## Debugging with Console Logs

The component includes helpful console logs to understand the flow:

```jsx
getNextPageParam: (latestPage, allpages) => {
  console.log("lastPage", latestPage);
  console.log("allpages", allpages);
  return latestPage?.next ?? undefined;
}

// Also logging states:
console.log("data", data);
console.log("isFetching", isFetching);
console.log("isFetchingNextPage", isFetchingNextPage);
console.log("hasNextPage", hasNextPage);
```

### Console Output on Initial Load

```javascript
// When page first loads
isFetching: true
isFetchingNextPage: false
hasNextPage: false  // Not determined yet

// After first page loads
lastPage: {
  first: 1,
  prev: null,
  next: 2,
  last: 4,
  pages: 4,
  items: 8,
  data: [
    { id: "1", label: "red" },
    { id: "2", label: "blue" }
  ]
}

allpages: [
  { /* same as lastPage above */ }
]

data: {
  pages: [
    { /* page 1 data */ }
  ],
  pageParams: [1]
}

isFetching: false
isFetchingNextPage: false
hasNextPage: true  // Because getNextPageParam returned 2
```

### Console Output After Clicking "Load More"

```javascript
// While loading page 2
isFetching: true
isFetchingNextPage: true  // Specifically loading next page
hasNextPage: true

// After page 2 loads
lastPage: {
  first: 1,
  prev: 1,
  next: 3,  // Next page to load
  last: 4,
  data: [
    { id: "3", label: "green" },
    { id: "4", label: "yellow" }
  ]
}

allpages: [
  { /* page 1 data */ },
  { /* page 2 data */ }
]

data: {
  pages: [
    { /* page 1 data */ },
    { /* page 2 data */ }
  ],
  pageParams: [1, 2]
}

isFetching: false
isFetchingNextPage: false
hasNextPage: true  // Because getNextPageParam returned 3
```

### Console Output on Final Page

```javascript
// After loading page 4 (last page)
lastPage: {
  first: 1,
  prev: 3,
  next: null,  // ← No more pages!
  last: 4,
  data: [
    { id: "7", label: "orange" },
    { id: "8", label: "purple" }
  ]
}

allpages: [
  { /* page 1 */ },
  { /* page 2 */ },
  { /* page 3 */ },
  { /* page 4 */ }
]

hasNextPage: false  // Because getNextPageParam returned undefined
```

### Using Console Logs for Debugging

**Check these logs to debug:**

1. **Page not loading?** 
   - Check if `isFetching: true` but data not updating
   - Verify `getNextPageParam` is returning correct value

2. **Button stays disabled?**
   - Check `hasNextPage` value
   - Verify `latestPage.next` is not `null` when you expect more pages

3. **Duplicate data?**
   - Check `data.pages` array - should have unique pages
   - Verify `pageParams` array has correct page numbers

4. **Wrong page loaded?**
   - Check what `getNextPageParam` is returning
   - Compare with `pageParams` array

## Complete Implementation

Here's the full component with all features:

```jsx
import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchColors = async ({ pageParam = 1 }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return await axios
    .get(`http://localhost:4000/colors?_page=${pageParam}&_per_page=2`)
    .then((res) => res.data);
};

function RQInfiniteQueriesPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (latestPage, allpages) => {
      console.log("lastPage", latestPage);
      console.log("allpages", allpages);
      return latestPage?.next ?? undefined;
    },
  });

  console.log("data", data);
  console.log("isFetching", isFetching);
  console.log("isFetchingNextPage", isFetchingNextPage);
  console.log("hasNextPage", hasNextPage);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : isError ? (
    <h2>{error.message}</h2>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>InfiniteQueriesPage</h2>
      {data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group?.data?.map((color) => (
            <div key={color.id} style={{ color: color.label }}>
              <h2>
                {color.id} - {color.label}
              </h2>
            </div>
          ))}
        </Fragment>
      ))}
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
        {isFetchingNextPage && <p>Loading more colors...</p>}
        {isFetching && !isFetchingNextPage && <p>Refreshing data...</p>}
      </div>
    </div>
  );
}

export default RQInfiniteQueriesPage;
```
