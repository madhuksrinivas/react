# SuperHeroesPage Component

## Overview

Demonstrates **traditional data fetching** using `useState` and `useEffect` without React Query.

## Purpose

Shows the pain points of traditional data fetching:

- Manual loading state management
- Manual error handling
- No caching
- No automatic refetching
- More boilerplate code

## Implementation

```jsx
function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);
}
```

## Pain Points

- ❌ Manual state management (loading, data, error)
- ❌ No caching - refetches on every mount
- ❌ No background updates
- ❌ More code to write and maintain

## Comparison

Compare this with `RQSuperHeroesPage` to see React Query benefits.

## API Endpoint

```
GET http://localhost:4000/superheroes
```

## Related Files

- `RQSuperHeroesPage.jsx` - React Query version
