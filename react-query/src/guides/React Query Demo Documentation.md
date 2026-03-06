# React Query Demo Documentation

## Overview

This project demonstrates various React Query patterns and use cases for efficient data fetching and state management.

## Components Documentation

### Basic Patterns

1. [HomePage](./HomePage.md) - Landing page
2. [SuperHeroesPage](./SuperHeroesPage.md) - Traditional fetching (without React Query)
3. [RQSuperHeroesPage](./RQSuperHeroesPage.md) - Basic React Query usage

### Advanced Patterns

4. [RQSuperHeroPage](./RQSuperHeroPage.md) - Single item with initialData optimization
5. [RQParallelQueries](./RQParallelQueries.md) - Multiple independent queries
6. [RQDynamicParallelQueries](./RQDynamicParallelQueries.md) - Dynamic useQueries
7. [RQDependentQueries](./RQDependentQueries.md) - Sequential queries with enabled

### Pagination Patterns

8. [RQPaginationQueries](./RQPaginationQueries.md) - Traditional pagination
9. [RQInfiniteQueries](./RQInfiniteQueries.md) - Infinite scroll

### Custom Hooks

10. [Custom Hooks Pattern](./Custom%20Hooks%20Pattern.md) - Reusable query hooks

## Key Concepts

### React Query Benefits

- ✅ Automatic caching
- ✅ Background refetching
- ✅ Optimistic updates
- ✅ Loading/Error states
- ✅ Pagination support
- ✅ Infinite scroll
- ✅ Request deduplication

### Query Patterns

- **Basic Query**: `useQuery` for single data fetch
- **Parallel Queries**: Multiple independent `useQuery` calls
- **Dynamic Parallel**: `useQueries` for array of queries
- **Dependent Queries**: Sequential with `enabled` option
- **Pagination**: `keepPreviousData` for smooth transitions
- **Infinite Scroll**: `useInfiniteQuery` with `getNextPageParam`

### Mutation Patterns

- **Add/Update/Delete**: `useMutation` for data modifications
- **Cache Invalidation**: `invalidateQueries` after mutations
- **Optimistic Updates**: Update UI before server response

## Quick Reference

### Import

```jsx
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueries,
} from "@tanstack/react-query";
```

### Basic Query

```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ["key"],
  queryFn: fetchData,
});
```

### Mutation

```jsx
const mutation = useMutation({
  mutationFn: addData,
  onSuccess: () => queryClient.invalidateQueries(["key"]),
});
```

### Pagination

```jsx
const { data } = useQuery({
  queryKey: ["data", page],
  queryFn: () => fetchPage(page),
  keepPreviousData: true,
});
```

### Infinite Scroll

```jsx
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  getNextPageParam: (lastPage) => lastPage.next,
});
```

## API Endpoints

All endpoints run on `http://localhost:4000`:

- `/superheroes` - Heroes list
- `/superheroes/:id` - Single hero
- `/friends` - Friends list
- `/users` - Users
- `/channels` - Channels with courses
- `/colors` - Colors (paginated)

## Setup

```bash
# Install dependencies
npm install

# Start JSON server (API)
npm run serve-json

# Start React app
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.jsx
│   ├── RQSuperHeroesPage.jsx
│   ├── RQPaginationQueriesPage.jsx
│   └── ...
├── hooks/              # Custom React Query hooks
│   ├── useSuperHeroesQuery.js
│   └── useSuperHeroQuery.js
└── docs/               # Documentation (you are here)
    ├── README.md
    ├── RQSuperHeroesPage.md
    └── ...
```

## Learning Path

1. Start with [SuperHeroesPage](./SuperHeroesPage.md) vs [RQSuperHeroesPage](./RQSuperHeroesPage.md)
2. Learn [initialData optimization](./RQSuperHeroPage.md)
3. Understand [Parallel Queries](./RQParallelQueries.md)
4. Master [Dependent Queries](./RQDependentQueries.md)
5. Explore [Pagination](./RQPaginationQueries.md) and [Infinite Scroll](./RQInfiniteQueries.md)
6. Create [Custom Hooks](./Custom%20Hooks%20Pattern.md)

## Resources

- [React Query Docs](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/devtools)
