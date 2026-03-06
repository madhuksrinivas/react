# RQSuperHeroesPage Component

## Overview

Demonstrates **React Query data fetching** with `useQuery` hook. Shows the improved developer experience compared to traditional fetching.

## Purpose

- Fetch and display list of superheroes using React Query
- Demonstrate automatic caching
- Show loading and error states
- Enable data mutations (add/delete heroes)
- Provide navigation to individual hero details

## Key Features

### 1. **Data Fetching with useQuery**

```jsx
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ["super-heroes"],
  queryFn: fetchSuperHeros,
});
```

### 2. **Automatic Caching**

- Data cached with key `['super-heroes']`
- Subsequent visits use cached data
- Background refetch on window focus

### 3. **Mutations (Add/Delete)**

```jsx
const addMutation = useMutation({
  mutationFn: addSuperHero,
  onSuccess: () => {
    queryClient.invalidateQueries(["super-heroes"]);
  },
});
```

### 4. **Optimistic Updates**

- UI updates immediately
- Rollback on error
- Better UX

## Benefits Over Traditional Approach

- ✅ **Less code** - No manual state management
- ✅ **Automatic caching** - Instant subsequent loads
- ✅ **Background updates** - Data stays fresh
- ✅ **Error retry** - Automatic retry on failure
- ✅ **Loading states** - Built-in `isLoading`, `isFetching`
- ✅ **Mutations** - Easy POST/DELETE with cache invalidation

## Important: isLoading vs isFetching

### The Difference

```jsx
// ❌ WRONG - Shows loading on every refetch (including background)
if (isLoading || isFetching) return <h2>Loading...</h2>;

// ✅ CORRECT - Only shows loading on first fetch
if (isLoading) return <h2>Loading...</h2>;
```

**Explanation:**

- **`isLoading`**: `true` only when fetching for the **first time** (no cached data exists)
- **`isFetching`**: `true` **every time** data is being fetched, including background refetches

### Why This Matters

When you navigate to a hero detail page and then click back:

1. React Query has the heroes list in **cache**
2. It displays the cached data immediately
3. It **also** refetches in the background to ensure fresh data
4. If you check `isFetching`, you'll see "Loading..." even though cached data is available

**Best Practice:** Use `isLoading` to show the cached data immediately while React Query updates in the background.

## API Endpoints

```
GET    http://localhost:4000/superheroes
POST   http://localhost:4000/superheroes
DELETE http://localhost:4000/superheroes/:id
```

## Code Structure

```jsx
// Fetch function
const fetchSuperHeros = () => axios.get("http://localhost:4000/superheroes");

// Query
const { data, isLoading } = useQuery({
  queryKey: ["super-heroes"],
  queryFn: fetchSuperHeros,
});

// Mutation
const addMutation = useMutation({
  mutationFn: addSuperHero,
  onSuccess: () => queryClient.invalidateQueries(["super-heroes"]),
});
```

## Navigation

- Click on hero → Navigate to `/rq-super-heroes/:heroId`
- Uses React Router `Link` component

## Related Files

- `SuperHeroesPage.jsx` - Traditional approach comparison
- `RQSuperHeroPage.jsx` - Individual hero details
- `useSuperHeroesQuery.js` - Custom hook version
