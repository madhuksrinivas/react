# RQDynamicParallelQueriesPage Component

## Overview

Fetches **multiple resources in parallel** when the number of queries is **determined at runtime** (dynamic).

## Purpose

- Handle dynamic list of IDs passed as props
- Fetch multiple heroes simultaneously
- Use `useQueries` for array of queries

## Use Case Examples

### Real-World Scenarios

1. **E-Commerce**: Compare multiple selected products
2. **Social Media**: Fetch profiles for list of user IDs
3. **Analytics**: Load multiple metric widgets
4. **Portfolio**: Track multiple stock prices
5. **Travel**: Search flights for multiple cities

## Key Difference: `useQueries` vs Multiple `useQuery`

### ❌ Can't Use Multiple `useQuery` with Dynamic Array

```jsx
// This won't work - can't use hooks in loops
heroIds.map((id) => useQuery(["hero", id], () => fetch(id)));
```

### ✅ Solution: `useQueries`

```jsx
const results = useQueries({
  queries: heroIds.map((id) => ({
    queryKey: ["super-hero", id],
    queryFn: () => fetchSuperHero(id),
  })),
});
```

## Implementation

```jsx
function RQDynamicParallelQueries({ heroIds }) {
  const queryResults = useQueries({
    queries: heroIds.map((heroId) => ({
      queryKey: ["super-hero", heroId],
      queryFn: () => fetchSuperhero(heroId),
    })),
  });

  return (
    <div>
      {queryResults.map(({ data, isLoading, error }, index) => (
        <div key={heroIds[index]}>
          {isLoading ? (
            <p>Loading hero {heroIds[index]}...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <p>
              {data?.data.name} - {data?.data.alterEgo}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Usage
<RQDynamicParallelQueries heroIds={[1, 4]} />;
```

## How It Works

### Input: `heroIds={[1, 4]}`

```
useQueries creates 2 queries:
┌─────────────────────────────┐
│ Query 1: ['super-hero', 1]  │ → Fetch Batman
├─────────────────────────────┤
│ Query 2: ['super-hero', 4]  │ → Fetch Wonder Woman
└─────────────────────────────┘
         ↓
Both execute in PARALLEL
         ↓
queryResults = [
  { data: Batman,  isLoading: false, ... },
  { data: Wonder Woman, isLoading: false, ... }
]
```

## Return Value Structure

```jsx
queryResults = [
  {
    data: { data: { id: 1, name: "Batman", alterEgo: "Bruce Wayne" } },
    isLoading: false,
    isError: false,
    error: null,
    status: "success",
  },
  {
    data: { data: { id: 4, name: "Wonder Woman", alterEgo: "Princess Diana" } },
    isLoading: false,
    isError: false,
    error: null,
    status: "success",
  },
];
```

## Key Features

### 1. **Dynamic Length**

```jsx
// Works with any array length
<RQDynamicParallelQueries heroIds={[1]} />
<RQDynamicParallelQueries heroIds={[1, 2, 3, 4]} />
<RQDynamicParallelQueries heroIds={[]} />
```

### 2. **Individual Error Handling**

One query failing doesn't break others:

```jsx
// If hero 1 fails, hero 4 still loads
queryResults[0].isError; // true
queryResults[1].data; // Wonder Woman data
```

### 3. **Independent Caching**

Each hero cached separately:

- `['super-hero', 1]` - Batman cache
- `['super-hero', 4]` - Wonder Woman cache

## Benefits

- ✅ **Flexible** - Works with any number of IDs
- ✅ **Parallel execution** - All queries fire simultaneously
- ✅ **Type-safe** - Returns array of query results
- ✅ **Individual states** - Each query has its own loading/error state

## API Endpoints

```
GET http://localhost:4000/superheroes/1
GET http://localhost:4000/superheroes/4
```

## Related Files

- `RQParallelQueries.jsx` - Static parallel queries
- `RQSuperHeroPage.jsx` - Single hero query
