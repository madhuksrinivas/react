# Complete React Query (TanStack Query) Guide

## Table of Contents
1. [Basic Setup](#basic-setup)
2. [useQuery - Fetching Data](#usequery---fetching-data)
3. [Query Configuration Options](#query-configuration-options)
4. [Query States](#query-states)
5. [useMutation - Modifying Data](#usemutation---modifying-data)
6. [Query Invalidation](#query-invalidation)
7. [Infinite Queries](#infinite-queries)
8. [Best Practices](#best-practices)

---

## Basic Setup

### 1. Installation
```bash
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

### 2. Setup QueryClient in Your App

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client instance that manages all your queries and cache
// Think of this as the "brain" that stores and manages all fetched data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: How long data stays "fresh" before becoming "stale"
      // 5000 = 5 seconds. After 5 seconds, data is considered old
      // When data is fresh, React Query won't refetch it
      // Default is 0 (data becomes stale immediately)
      staleTime: 5000,
      
      // cacheTime: How long inactive data stays in memory
      // 10 minutes = 600000 ms. After this, unused data is garbage collected
      // Even if data is "stale", it stays in cache and can be shown instantly
      // Default is 5 minutes
      cacheTime: 10 * 60 * 1000,
      
      // refetchOnWindowFocus: Should data refetch when user returns to the tab?
      // true = yes, refetch to get latest data (default)
      // false = no, keep showing cached data
      refetchOnWindowFocus: true,
      
      // retry: How many times to retry failed requests
      // 3 = try 3 times before giving up (default)
      // false = don't retry at all
      retry: 3,
    },
  },
});

function App() {
  return (
    // Wrap your entire app with QueryClientProvider
    // This makes React Query available to all child components
    <QueryClientProvider client={queryClient}>
      {/* Your app components go here */}
      <YourApp />
      
      {/* DevTools: A debugging panel to see all queries and their states */}
      {/* initialIsOpen={false}: Starts minimized (click icon to open) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

## useQuery - Fetching Data

### Basic Syntax (v4+)

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Component = () => {
  // useQuery hook takes an object with two required properties:
  const { isLoading, data, error } = useQuery({
    // queryKey: Unique identifier for this query (MUST be an array)
    // Like a "name tag" for your data in the cache
    // ["super-heroes"] = simple key
    // ["super-heroes", id] = key with parameter
    queryKey: ["super-heroes"],
    
    // queryFn: The function that actually fetches the data
    // MUST return a Promise (axios.get returns a Promise)
    // This function runs when:
    // 1. Component mounts
    // 2. Data becomes stale and certain events trigger (window focus, etc.)
    queryFn: () => {
      return axios.get("http://localhost:4000/superheroes");
    },
  });

  // isLoading: true when fetching for the FIRST time (no cached data)
  // Shows a loading spinner on initial load
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // error: Contains error object if the request failed
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // data: The response from your API
  // For axios, the actual data is in data.data
  return (
    <div>
      {data.data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  );
};
```

### Alternative Syntax (Cleaner for axios)

```jsx
export const Component = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["super-heroes"],
    
    // Using async/await to automatically extract data.data
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/superheroes");
      // Return only the data part, not the whole axios response
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Now data is already the array, not data.data
  return (
    <div>
      {data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  );
};
```

---

## Query Configuration Options

### All Available States and Options

```jsx
const {
  // Boolean States (true/false):
  
  // isLoading: true only on FIRST fetch (no cached data exists)
  isLoading,
  
  // isFetching: true whenever fetching (even if cached data exists)
  // Use this to show a small loading indicator while refreshing
  isFetching,
  
  // isError: true if the query failed
  isError,
  
  // isSuccess: true if the query succeeded
  isSuccess,
  
  // Data & Error:
  
  // data: The successful response data
  data,
  
  // error: The error object if request failed
  error,
  
  // Status Strings:
  
  // status: Current status - "loading" | "error" | "success"
  status,
  
  // Additional Info:
  
  // dataUpdatedAt: Timestamp of when data was last updated
  dataUpdatedAt,
  
  // errorUpdateCount: How many times this query has errored
  errorUpdateCount,
  
  // failureCount: Current failure count (resets on success)
  failureCount,
  
  // Manual Control Functions:
  
  // refetch: Function to manually trigger a refetch
  // Example: <button onClick={refetch}>Refresh</button>
  refetch,
  
  // remove: Function to remove this query from cache
  remove,
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: fetchSuperHeroes,
  
  // ============ CONFIGURATION OPTIONS ============
  
  // enabled: Should this query run automatically?
  // true = run on mount (default)
  // false = don't run (use refetch() to run manually)
  // Useful for queries that depend on user input
  enabled: true,
  
  // staleTime: How long data is considered "fresh" (in milliseconds)
  // 0 = data becomes stale immediately (default)
  // 30000 = data stays fresh for 30 seconds
  // Infinity = data never becomes stale
  // Fresh data won't refetch on window focus or mount
  staleTime: 30000,
  
  // cacheTime: How long unused data stays in cache (in milliseconds)
  // 300000 = 5 minutes (default)
  // After this time, if no component uses this data, it's removed
  cacheTime: 10 * 60 * 1000, // 10 minutes
  
  // refetchOnMount: Refetch when component mounts?
  // true = always refetch (default)
  // false = never refetch
  // "always" = refetch even if data is fresh
  refetchOnMount: true,
  
  // refetchOnWindowFocus: Refetch when user returns to tab/window?
  // true = yes (default) - ensures data is always up-to-date
  // false = no
  refetchOnWindowFocus: true,
  
  // refetchInterval: Auto-refetch every X milliseconds
  // false = no auto-refetch (default)
  // 5000 = refetch every 5 seconds (useful for real-time data)
  refetchInterval: false,
  
  // refetchIntervalInBackground: Keep refetching even when tab is hidden?
  // false = pause when tab is hidden (default)
  // true = keep refetching in background
  refetchIntervalInBackground: false,
  
  // retry: How many times to retry failed requests
  // 3 = retry 3 times (default)
  // false = don't retry
  // true = retry infinitely
  retry: 3,
  
  // retryDelay: How long to wait between retries (in milliseconds)
  // Can be a number or a function
  // Default increases delay with each retry (exponential backoff)
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  
  // select: Transform/filter the data before returning it
  // Useful for extracting specific fields or filtering
  select: (data) => {
    // Only return hero names, not full objects
    return data.map((hero) => hero.name);
  },
  
  // onSuccess: Callback function when query succeeds
  // Useful for showing notifications or updating other state
  onSuccess: (data) => {
    console.log("Data fetched successfully!", data);
  },
  
  // onError: Callback function when query fails
  // Useful for logging errors or showing error messages
  onError: (error) => {
    console.error("Query failed:", error.message);
  },
  
  // onSettled: Callback that runs after success OR error
  // Runs regardless of outcome
  onSettled: (data, error) => {
    console.log("Query completed");
  },
});
```

### Practical Example with Multiple Options

```jsx
export const SuperHeroDetails = ({ heroId }) => {
  const { isLoading, data, error, isFetching, refetch } = useQuery({
    // Include heroId in the key so each hero has its own cached data
    queryKey: ["super-hero", heroId],
    
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4000/superheroes/${heroId}`);
      return response.data;
    },
    
    // Only fetch if heroId exists (user has selected a hero)
    enabled: !!heroId, // !! converts to boolean
    
    // Keep hero data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    
    // Keep in cache for 10 minutes even if component unmounts
    cacheTime: 10 * 60 * 1000,
    
    // Don't refetch when switching back to this tab
    // (data is fresh for 5 minutes anyway)
    refetchOnWindowFocus: false,
    
    // Only return the hero's name and powers
    select: (data) => ({
      name: data.name,
      powers: data.powers,
    }),
  });

  // Show loading state only on initial fetch
  if (isLoading) return <div>Loading hero details...</div>;
  
  // Show error if fetch failed
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Powers: {data.powers.join(", ")}</p>
      
      {/* Show small indicator when refetching in background */}
      {isFetching && <span>Updating...</span>}
      
      {/* Manual refresh button */}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

---

## Query States

### Understanding the Difference Between States

```jsx
const Example = () => {
  const { isLoading, isFetching, isError, isSuccess, data } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  // SCENARIO 1: First time loading (no cached data)
  // isLoading = true
  // isFetching = true
  // data = undefined
  
  // SCENARIO 2: Data loaded successfully and cached
  // isLoading = false (we have cached data now)
  // isFetching = false (not currently fetching)
  // isSuccess = true
  // data = {...cached data...}
  
  // SCENARIO 3: Refetching in background (data is stale, but cached data exists)
  // isLoading = false (we have cached data to show)
  // isFetching = true (currently fetching fresh data)
  // isSuccess = true
  // data = {...old cached data...} (shows old data while fetching new)
  
  // SCENARIO 4: Error occurred
  // isLoading = false
  // isFetching = false
  // isError = true
  // error = {...error object...}

  // Best Practice: Use isLoading for initial loading screen
  if (isLoading) {
    return <div>Loading for the first time...</div>;
  }

  // Best Practice: Use isFetching for background refresh indicator
  return (
    <div>
      {isFetching && <div className="small-spinner">Updating...</div>}
      <div>{data}</div>
    </div>
  );
};
```

---

## useMutation - Modifying Data

Mutations are for POST, PUT, DELETE requests (creating, updating, deleting data).

### Basic Mutation

```jsx
import { useMutation } from "@tanstack/react-query";

export const AddHero = () => {
  // useMutation returns an object with methods and state
  const mutation = useMutation({
    // mutationFn: The function that performs the mutation
    // Takes one argument (the data you pass to mutate())
    mutationFn: (newHero) => {
      // POST request to create a new hero
      return axios.post("http://localhost:4000/superheroes", newHero);
    },
    
    // onSuccess: Runs after successful mutation
    // data = response from server
    // variables = the newHero object you passed to mutate()
    onSuccess: (data, variables) => {
      console.log("Hero added!", data);
      alert(`${variables.name} was added successfully!`);
    },
    
    // onError: Runs if mutation fails
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // mutate(): Call this to trigger the mutation
    // Pass the data you want to send to the server
    mutation.mutate({
      name: "Spider-Man",
      alterEgo: "Peter Parker",
    });
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={mutation.isLoading}>
        {/* isLoading: true while mutation is in progress */}
        {mutation.isLoading ? "Adding..." : "Add Hero"}
      </button>
      
      {/* isError: true if mutation failed */}
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      
      {/* isSuccess: true if mutation succeeded */}
      {mutation.isSuccess && <div>Hero added successfully!</div>}
    </div>
  );
};
```

### Mutation with Form Data

```jsx
export const AddHeroForm = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const mutation = useMutation({
    mutationFn: (newHero) => {
      return axios.post("http://localhost:4000/superheroes", newHero);
    },
    onSuccess: () => {
      // Clear form after successful submission
      setName("");
      setAlterEgo("");
      alert("Hero added!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pass form data to mutation
    mutation.mutate({
      name,
      alterEgo,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Hero Name"
      />
      <input
        type="text"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
        placeholder="Alter Ego"
      />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Adding..." : "Add Hero"}
      </button>
    </form>
  );
};
```

---

## Query Invalidation

After a mutation, you need to refresh the list to show the new/updated/deleted data.

### Invalidating Queries

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AddHero = () => {
  // Get access to the queryClient to control the cache
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newHero) => {
      return axios.post("http://localhost:4000/superheroes", newHero);
    },
    
    onSuccess: () => {
      // invalidateQueries: Mark queries as "stale" and refetch them
      // This refreshes the hero list to include the newly added hero
      queryClient.invalidateQueries({
        // Invalidate any query whose key starts with ["super-heroes"]
        queryKey: ["super-heroes"],
      });
      
      // Alternative: Invalidate exact match only
      // queryClient.invalidateQueries({ queryKey: ["super-heroes"], exact: true });
    },
  });

  // ... rest of component
};
```

### Optimistic Updates

Update the UI immediately, before the server responds (feels faster).

```jsx
export const AddHero = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newHero) => {
      return axios.post("http://localhost:4000/superheroes", newHero);
    },
    
    // onMutate: Runs BEFORE the mutation function
    // Use this for optimistic updates
    onMutate: async (newHero) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["super-heroes"] });
      
      // Save the current data (in case we need to rollback)
      const previousHeroes = queryClient.getQueryData(["super-heroes"]);
      
      // Optimistically update the cache with the new hero
      queryClient.setQueryData(["super-heroes"], (old) => {
        // Add the new hero to the existing list
        return [...old, { ...newHero, id: Date.now() }]; // temporary ID
      });
      
      // Return context object with the saved data
      // This will be passed to onError for rollback
      return { previousHeroes };
    },
    
    // onError: If mutation fails, rollback to previous data
    onError: (err, newHero, context) => {
      // Restore the saved data from context
      queryClient.setQueryData(["super-heroes"], context.previousHeroes);
    },
    
    // onSettled: Always runs at the end (success or error)
    // Refetch to ensure we have the correct server data
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });

  // ... rest of component
};
```

---

## Infinite Queries

For pagination and infinite scrolling.

### useInfiniteQuery

```jsx
import { useInfiniteQuery } from "@tanstack/react-query";

export const InfiniteHeroes = () => {
  const {
    // data: Contains all pages fetched so far
    data,
    
    // fetchNextPage: Function to load the next page
    fetchNextPage,
    
    // hasNextPage: true if there are more pages to load
    hasNextPage,
    
    // isFetchingNextPage: true while loading next page
    isFetchingNextPage,
    
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["infinite-heroes"],
    
    // queryFn: Gets a pageParam argument
    // pageParam starts as undefined (first page)
    queryFn: ({ pageParam = 1 }) => {
      // Fetch the specific page
      return axios.get(`http://localhost:4000/superheroes?_page=${pageParam}&_limit=10`);
    },
    
    // getNextPageParam: Determine the next page number
    // lastPage = the response from the most recent fetch
    // allPages = array of all pages fetched so far
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has data, return next page number
      if (lastPage.data.length > 0) {
        return allPages.length + 1; // Next page number
      }
      // If last page is empty, no more pages
      return undefined; // hasNextPage will become false
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* data.pages: Array of all page responses */}
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {/* Each page contains an array of heroes */}
          {page.data.map((hero) => (
            <div key={hero.id}>{hero.name}</div>
          ))}
        </div>
      ))}
      
      {/* Load More button */}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No more heroes"}
      </button>
    </div>
  );
};
```

---

## Best Practices

### 1. Query Key Structure

```jsx
// ❌ Bad: String key (old syntax)
queryKey: "heroes"

// ✅ Good: Array key
queryKey: ["heroes"]

// ✅ Better: Hierarchical keys
queryKey: ["heroes"] // All heroes
queryKey: ["heroes", heroId] // Specific hero
queryKey: ["heroes", heroId, "missions"] // Hero's missions
queryKey: ["heroes", { type: "marvel", active: true }] // Filtered heroes

// Keys are compared by deep equality
// ["heroes", 1] and ["heroes", 1] are the SAME query
// ["heroes", 1] and ["heroes", 2] are DIFFERENT queries
```

### 2. Extract Query Functions

```jsx
// ❌ Bad: Inline function
useQuery({
  queryKey: ["heroes"],
  queryFn: () => axios.get("http://localhost:4000/superheroes"),
});

// ✅ Good: Separate function
const fetchHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  return response.data;
};

useQuery({
  queryKey: ["heroes"],
  queryFn: fetchHeroes,
});

// ✅ Better: Reusable API functions
// api/heroes.js
export const heroesAPI = {
  getAll: async () => {
    const response = await axios.get("http://localhost:4000/superheroes");
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`http://localhost:4000/superheroes/${id}`);
    return response.data;
  },
  
  create: async (hero) => {
    const response = await axios.post("http://localhost:4000/superheroes", hero);
    return response.data;
  },
};

// In component:
useQuery({
  queryKey: ["heroes"],
  queryFn: heroesAPI.getAll,
});
```

### 3. Custom Hooks

```jsx
// hooks/useSuperHeroes.js

// ✅ Create custom hooks for reusable queries
export const useSuperHeroes = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/superheroes");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSuperHero = (heroId) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4000/superheroes/${heroId}`);
      return response.data;
    },
    enabled: !!heroId, // Only fetch if heroId exists
  });
};

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newHero) => {
      return axios.post("http://localhost:4000/superheroes", newHero);
    },
    onSuccess: () => {
      // Automatically refresh the heroes list
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};

// In component:
const { data, isLoading } = useSuperHeroes();
const addHero = useAddSuperHero();
```

### 4. Error Handling

```jsx
// ✅ Global error handling in QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests
      retry: 3,
      
      // Global error handler
      onError: (error) => {
        console.error("Query error:", error);
        // Show toast notification, etc.
      },
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
        alert(`Error: ${error.message}`);
      },
    },
  },
});

// ✅ Component-level error handling
const { data, error, isError } = useQuery({
  queryKey: ["heroes"],
  queryFn: fetchHeroes,
  onError: (error) => {
    // Specific error handling for this query
    console.error("Failed to fetch heroes:", error);
  },
});

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

### 5. Loading States

```jsx
// ✅ Differentiate between initial load and background refresh
const { data, isLoading, isFetching } = useQuery({
  queryKey: ["heroes"],
  queryFn: fetchHeroes,
});

// Show full loading screen only on initial load
if (isLoading) {
  return <div>Loading heroes...</div>;
}

return (
  <div>
    {/* Show small indicator during background refresh */}
    {isFetching && <div className="refresh-indicator">Updating...</div>}
    
    {/* Data is always available here (cached or fresh) */}
    {data.map((hero) => (
      <div key={hero.id}>{hero.name}</div>
    ))}
  </div>
);
```

---

## Quick Reference

### When to use what:

- **`isLoading`**: Show full loading screen on first fetch
- **`isFetching`**: Show small indicator during background refresh
- **`staleTime`**: How long data stays fresh (won't refetch)
- **`cacheTime`**: How long unused data stays in memory
- **`refetchOnWindowFocus`**: Refetch when user returns to tab
- **`enabled`**: Control when query runs (good for dependent queries)
- **`select`**: Transform data before returning
- **`invalidateQueries`**: Force queries to refetch (after mutations)

### Common Patterns:

```jsx
// Fetch on mount, stay fresh for 5 minutes
staleTime: 5 * 60 * 1000

// Never refetch automatically
staleTime: Infinity

// Fetch only when button clicked
enabled: false // Use refetch() manually

// Dependent queries (fetch B only after A succeeds)
const { data: userID } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
const { data: posts } = useQuery({
  queryKey: ["posts", userID],
  queryFn: () => fetchPosts(userID),
  enabled: !!userID, // Only run when userID exists
});

// Polling (refetch every 5 seconds)
refetchInterval: 5000
```

---

This guide covers 90% of React Query usage! Experiment with the options to understand how they affect your app's behavior. Happy coding! 🚀
