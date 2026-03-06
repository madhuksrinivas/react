# RQSuperHeroPage Component (Detail View)

## Overview

Displays individual superhero details using the hero ID from URL parameters.

## Purpose

- Fetch single hero data by ID
- Demonstrate dynamic route parameters with React Query
- Show `initialData` optimization technique

## Key Concept: Initial Data Optimization

### Problem

When navigating from heroes list → hero detail:

- User already saw the hero data in the list
- Making another API call seems wasteful

### Solution: `initialData`

```jsx
const { data: hero } = useQuery({
  queryKey: ["super-hero", heroId],
  queryFn: () => fetchSuperHero(heroId),

  // Check if hero data already exists in cache
  initialData: () => {
    const hero = queryClient
      .getQueryData(["super-heroes"])
      ?.data?.find((h) => h.id === parseInt(heroId));

    if (hero) return { data: hero };
    return undefined;
  },
});
```

## How It Works

### Step 1: User visits `/rq-super-heroes`

```
Fetch all heroes → Cache under ['super-heroes']
[
  { id: 1, name: "Batman", alterEgo: "Bruce Wayne" },
  { id: 2, name: "Superman", alterEgo: "Clark Kent" }
]
```

### Step 2: User clicks "Batman"

```
Navigate to /rq-super-heroes/1
↓
initialData function runs:
  - Look in ['super-heroes'] cache
  - Find hero with id === 1
  - Return {data: {id: 1, name: "Batman", ...}}
↓
Display Batman instantly! ⚡ (No API call)
```

### Step 3: Background Refresh (Optional)

```
Based on staleTime setting:
- If data is stale, refetch in background
- Update UI when new data arrives
```

## Benefits

- ✅ **Instant navigation** - No loading spinner
- ✅ **Reduced API calls** - Reuse cached data
- ✅ **Better UX** - Smooth transitions
- ✅ **Bandwidth savings** - Fewer network requests

## Route Parameter

```jsx
// In App.jsx
<Route path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage />} />;

// In component
const { heroId } = useParams(); // from react-router-dom
```

## API Endpoint

```
GET http://localhost:4000/superheroes/:id
```

## When initialData is NOT Found

If hero isn't in cache (e.g., direct URL visit):

- `initialData` returns `undefined`
- React Query makes normal API call
- Shows loading state

## Related Files

- `RQSuperHeroesPage.jsx` - List view that caches heroes
- `useSuperHeroQuery.js` - Custom hook with initialData logic
