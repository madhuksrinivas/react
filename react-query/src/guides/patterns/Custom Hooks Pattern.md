# Custom Hooks Pattern

## Overview

Extract React Query logic into reusable custom hooks for better code organization and reusability.

## Files

- `useSuperHeroesQuery.js` - Fetch all heroes
- `useSuperHeroQuery.js` - Fetch single hero with initialData
- `useAddSuperHeroMutation.js` - Add new hero

## Benefits

### 1. **Separation of Concerns**

```jsx
// ❌ Before: Logic mixed with UI
function Component() {
  const { data } = useQuery({
    queryKey: ["heroes"],
    queryFn: fetchHeroes,
    staleTime: 30000,
    // ... more config
  });

  return <div>{/* UI */}</div>;
}

// ✅ After: Clean separation
function Component() {
  const { data } = useSuperHeroesQuery();
  return <div>{/* UI */}</div>;
}
```

### 2. **Reusability**

```jsx
// Use in multiple components
function HeroList() {
  const { data } = useSuperHeroesQuery();
}

function HeroCount() {
  const { data } = useSuperHeroesQuery(); // Same cache!
}
```

### 3. **Centralized Configuration**

```jsx
// All query config in one place
export const useSuperHeroesQuery = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeros,
    staleTime: 30000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    // Easy to update config for all usages
  });
};
```

## Example: useSuperHeroQuery.js

```javascript
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroQuery = ({ heroId }) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: () => fetchSuperHero(heroId),

    // ⭐ initialData optimization
    initialData: () => {
      const hero = queryClient
        .getQueryData(["super-heroes"])
        ?.data?.find((h) => h.id === parseInt(heroId));

      if (hero) return { data: hero };
      return undefined;
    },
  });
};
```

### Usage

```jsx
import { useSuperHeroQuery } from "../hooks/useSuperHeroQuery";

function HeroDetail() {
  const { heroId } = useParams();
  const { data, isLoading } = useSuperHeroQuery({ heroId });

  if (isLoading) return <div>Loading...</div>;

  return <div>{data?.data.name}</div>;
}
```

## Pattern Benefits

### Testability

```javascript
// Easy to test hooks in isolation
import { renderHook } from "@testing-library/react-hooks";
import { useSuperHeroQuery } from "./useSuperHeroQuery";

test("fetches hero", async () => {
  const { result } = renderHook(() => useSuperHeroQuery({ heroId: 1 }));
  // assertions...
});
```

### Type Safety (TypeScript)

```typescript
export const useSuperHeroQuery = ({ heroId }: { heroId: string }) => {
  return useQuery<HeroResponse, Error>({
    // Type-safe throughout app
  });
};
```

### Consistent Behavior

All components using `useSuperHeroesQuery` get:

- Same cache key
- Same staleTime
- Same refetch behavior
- Same error handling

## Best Practices

### 1. **One Hook Per Query**

```jsx
// ✅ Good
useSuperHeroesQuery(); // Fetch all
useSuperHeroQuery(id); // Fetch one
useAddSuperHeroMutation(); // Add mutation

// ❌ Avoid
useHeroQueries(); // Too generic
```

### 2. **Accept Parameters**

```jsx
export const useSuperHeroQuery = ({ heroId, enabled = true }) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: () => fetchHero(heroId),
    enabled, // Allow customization
  });
};
```

### 3. **Export Query Keys**

```jsx
export const heroKeys = {
  all: ['heroes'] as const,
  lists: () => [...heroKeys.all, 'list'] as const,
  list: (filters) => [...heroKeys.lists(), filters] as const,
  details: () => [...heroKeys.all, 'detail'] as const,
  detail: (id) => [...heroKeys.details(), id] as const,
};
```

## Related Files

- `RQSuperHeroesPage.jsx` - Uses custom hooks
- `RQSuperHeroPage.jsx` - Uses custom hook with initialData
