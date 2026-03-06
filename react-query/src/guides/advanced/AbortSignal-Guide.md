# AbortSignal in React Query - Complete Guide

## 🎯 What is AbortSignal?

**AbortSignal** is a Web API feature that allows you to **cancel in-flight network requests**. In React Query, it's automatically provided to your `queryFn` and enables you to abort queries when they're no longer needed.

### 🔑 Key Concept:

When a component unmounts or when a query becomes inactive, you don't want those network requests to continue consuming resources. `AbortSignal` lets you **gracefully cancel** these requests.

---

## 🚀 How Does It Work?

React Query automatically creates an `AbortSignal` for each query and passes it to your query function. When the query should be cancelled (component unmounts, query is invalidated, etc.), React Query **aborts the signal**.

### Visual Flow:

```
Component Mounts
       ↓
React Query Starts Query
       ↓
Creates AbortSignal
       ↓
Passes signal to queryFn → fetch('/api', { signal })
       ↓
┌─────────────────────────────────────┐
│  User navigates away OR             │
│  Component unmounts OR              │
│  Query is cancelled                 │
└─────────────────────────────────────┘
       ↓
AbortSignal fires abort()
       ↓
Network request is cancelled ✅
(Saves bandwidth & prevents memory leaks)
```

---

## 📝 Where Can Signal Be Used?

### ✅ **1. useQuery** (Most Common)

```javascript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async ({ signal }) => {
  // Pass signal to axios
  const response = await axios.get("http://localhost:4000/superheroes", {
    signal, // AbortSignal provided by React Query
  });
  return response.data;
};

export function useSuperHeroesWithSignal() {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes, // React Query passes { signal } automatically
  });
}
```

**When it cancels:**
- Component unmounts
- Query key changes
- Query is manually cancelled
- Window loses focus (with refetchOnWindowFocus)

---

### ✅ **2. useInfiniteQuery**

```javascript
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchInfiniteColors = async ({ pageParam = 1, signal }) => {
  const response = await axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`,
    { signal } // Cancel if user navigates away mid-scroll
  );
  return response.data;
};

export function useInfiniteColorsWithSignal() {
  return useInfiniteQuery({
    queryKey: ["colors-infinite"],
    queryFn: fetchInfiniteColors,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length < 4 ? allPages.length + 1 : undefined;
    },
  });
}
```

**Why it matters here:**
- User might scroll fast and trigger multiple page fetches
- If they navigate away, all pending page requests are cancelled
- Prevents memory leaks in infinite scroll scenarios

---

### ✅ **3. useMutation**

```javascript
import { useMutation } from "@tanstack/react-query";

const addSuperHero = async ({ hero, signal }) => {
  const response = await axios.post(
    "http://localhost:4000/superheroes",
    hero,
    { signal } // Cancel if user navigates during POST
  );
  return response.data;
};

export function useAddSuperHeroWithSignal() {
  return useMutation({
    mutationFn: ({ hero, signal }) => addSuperHero({ hero, signal }),
  });
}
```

**Use case:**
- User clicks "Save" but navigates away before it completes
- Cancel the POST/PUT/DELETE request to avoid orphaned operations

---

### ✅ **4. Parallel Queries**

```javascript
const fetchSuperHeroes = async ({ signal }) => {
  const response = await axios.get("http://localhost:4000/superheroes", {
    signal,
  });
  return response.data;
};

const fetchFriends = async ({ signal }) => {
  const response = await axios.get("http://localhost:4000/friends", {
    signal,
  });
  return response.data;
};

export function ParallelQueriesWithSignal() {
  const { data: heroes } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes, // Has signal
  });

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends, // Has signal
  });

  // If component unmounts, BOTH requests are cancelled
  return (
    <div>
      {/* Render data */}
    </div>
  );
}
```

**Benefit:**
- All parallel requests are cancelled together
- Prevents race conditions

---

### ✅ **5. Dependent Queries**

```javascript
const fetchUser = async ({ signal, userEmail }) => {
  const response = await axios.get(`http://localhost:4000/users/${userEmail}`, {
    signal,
  });
  return response.data;
};

const fetchChannels = async ({ signal, channelId }) => {
  const response = await axios.get(`http://localhost:4000/channels/${channelId}`, {
    signal,
  });
  return response.data;
};

export function DependentQueriesWithSignal({ email }) {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: ({ signal }) => fetchUser({ signal, userEmail: email }),
  });

  const channelId = user?.channelId;

  const { data: channels } = useQuery({
    queryKey: ["channels", channelId],
    queryFn: ({ signal }) => fetchChannels({ signal, channelId }),
    enabled: !!channelId, // Only run if channelId exists
  });

  return (
    <div>
      {/* Render user and channels */}
    </div>
  );
}
```

**Why it's important:**
- If user changes, the second query is cancelled before channelId changes
- Prevents showing wrong data for brief moments

---

### ✅ **6. Dynamic Parallel Queries (useQueries)**

```javascript
import { useQueries } from "@tanstack/react-query";

const fetchSuperHero = async ({ signal, heroId }) => {
  const response = await axios.get(
    `http://localhost:4000/superheroes/${heroId}`,
    { signal }
  );
  return response.data;
};

export function DynamicParallelWithSignal({ heroIds }) {
  const results = useQueries({
    queries: heroIds.map((id) => ({
      queryKey: ["super-hero", id],
      queryFn: ({ signal }) => fetchSuperHero({ signal, heroId: id }),
    })),
  });

  // All requests cancelled if component unmounts
  return (
    <div>
      {results.map((result, index) => (
        <div key={heroIds[index]}>{result.data?.name}</div>
      ))}
    </div>
  );
}
```

**Use case:**
- Fetching multiple individual items in parallel
- If heroIds change, old requests are cancelled

---

## 🔧 How to Use Signal in Your Query Functions

### Method 1: Using Fetch API (Native)

```javascript
const fetchData = async ({ signal }) => {
  const response = await fetch("http://localhost:4000/superheroes", {
    signal, // Native support
  });
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  
  return response.json();
};
```

### Method 2: Using Axios

```javascript
import axios from "axios";

const fetchData = async ({ signal }) => {
  const response = await axios.get("http://localhost:4000/superheroes", {
    signal, // Axios supports AbortSignal (v0.22.0+)
  });
  return response.data;
};
```

### Method 3: Destructuring from queryFn Context

```javascript
const fetchData = async (context) => {
  const { signal, queryKey } = context;
  
  console.log("Query Key:", queryKey); // ["super-heroes"]
  console.log("Signal:", signal); // AbortSignal instance
  
  const response = await axios.get("http://localhost:4000/superheroes", {
    signal,
  });
  return response.data;
};
```

### Method 4: Getting Query Key and Signal Together

```javascript
const fetchSuperHero = async ({ signal, queryKey }) => {
  const heroId = queryKey[1]; // Extract heroId from queryKey
  
  const response = await axios.get(
    `http://localhost:4000/superheroes/${heroId}`,
    { signal }
  );
  return response.data;
};

// Usage
useQuery({
  queryKey: ["super-hero", "1"],
  queryFn: fetchSuperHero, // Receives both signal and queryKey
});
```

---

## 🎯 When Should You Use Signal?

### ✅ **You SHOULD Use Signal When:**

1. **Long-running requests** (slow APIs, large data transfers)
2. **Frequent navigation** (SPAs where users navigate quickly)
3. **Infinite scroll** (many requests can pile up)
4. **Search/autocomplete** (rapid-fire requests as user types)
5. **Polling** (regular interval requests that need cleanup)
6. **Mobile apps** (limited bandwidth/battery)

### ❌ **Signal is LESS Critical When:**

1. **Very fast APIs** (< 100ms response time)
2. **Static pages** (no navigation)
3. **One-time requests** (rare user actions)

---

## 📊 Comparison: With vs Without Signal

### ❌ **Without Signal:**

```javascript
const fetchSuperHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  return response.data;
};

// Problem: Request continues even after component unmounts
// Can cause:
// - Memory leaks
// - Unnecessary network usage
// - State updates on unmounted components (React warnings)
```

### ✅ **With Signal:**

```javascript
const fetchSuperHeroes = async ({ signal }) => {
  const response = await axios.get("http://localhost:4000/superheroes", {
    signal,
  });
  return response.data;
};

// Benefits:
// ✅ Request cancelled when component unmounts
// ✅ No memory leaks
// ✅ Saves bandwidth
// ✅ Cleaner console (no React warnings)
```

---

## 🛠️ Practical Example: Search with AbortSignal

```javascript
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const searchSuperHeroes = async ({ signal, searchTerm }) => {
  const response = await axios.get(
    `http://localhost:4000/superheroes?name_like=${searchTerm}`,
    { signal }
  );
  return response.data;
};

export function SearchHeroes() {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["search-heroes", search],
    queryFn: ({ signal }) => searchSuperHeroes({ signal, searchTerm: search }),
    enabled: search.length > 0, // Only search if there's input
  });

  // When user types "Batman" quickly: B → Ba → Bat → Batm → Batma → Batman
  // Without signal: 6 requests all complete
  // With signal: Only last request completes, first 5 are cancelled ✅

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search heroes..."
      />
      {isFetching && <span>Searching...</span>}
      <ul>
        {data?.map((hero) => (
          <li key={hero.id}>{hero.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🔍 How to Detect if Request Was Aborted

```javascript
const fetchData = async ({ signal }) => {
  try {
    const response = await axios.get("http://localhost:4000/superheroes", {
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request was cancelled:", error.message);
      // Don't treat this as an error
      return null;
    }
    // Real error, rethrow
    throw error;
  }
};
```

---

## 📌 Important Notes

### 1. **React Query Handles Signal Automatically**

You don't need to create the signal yourself:

```javascript
// ❌ DON'T DO THIS
const controller = new AbortController();
const signal = controller.signal;

// ✅ React Query creates it for you
const fetchData = async ({ signal }) => {
  // Just use the signal parameter
};
```

### 2. **Signal is ALWAYS Available**

```javascript
const fetchData = async (context) => {
  // context always includes:
  // - signal: AbortSignal
  // - queryKey: string[]
  // - meta: Record<string, unknown> | undefined
  // - pageParam: unknown (for infinite queries)
};
```

### 3. **Axios Version Requirement**

Make sure you have **Axios v0.22.0+** for AbortSignal support:

```bash
npm install axios@latest
```

### 4. **Fetch API vs Axios**

Both support AbortSignal, but syntax differs:

```javascript
// Fetch API
fetch(url, { signal });

// Axios
axios.get(url, { signal });
```

---

## 🎨 Real-World Summary Table

| Query Type | Can Use Signal? | When to Use |
|-----------|----------------|-------------|
| **useQuery** | ✅ Yes | Always recommended for API calls |
| **useInfiniteQuery** | ✅ Yes | Critical for infinite scroll |
| **useMutation** | ✅ Yes | For long POST/PUT/DELETE operations |
| **useQueries** | ✅ Yes | When fetching multiple items dynamically |
| **Parallel Queries** | ✅ Yes | Cancel all if component unmounts |
| **Dependent Queries** | ✅ Yes | Prevent race conditions |
| **Paginated Queries** | ✅ Yes | Cancel old page requests |

---

## 🌟 Best Practices

1. **Always pass signal to network requests** (axios, fetch)
2. **Don't manually create AbortController** (React Query handles it)
3. **Use signal for all external API calls** (not just queries)
4. **Handle cancellation errors gracefully** (don't show error UI)
5. **Test with slow network** (DevTools → Network → Slow 3G)

---

## 🚀 Migration: Add Signal to Your Existing Queries

### Before (No Signal):
```javascript
const fetchSuperHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  return response.data;
};
```

### After (With Signal):
```javascript
const fetchSuperHeroes = async ({ signal }) => {
  const response = await axios.get("http://localhost:4000/superheroes", {
    signal,
  });
  return response.data;
};
```

**That's it!** Just add `{ signal }` parameter and pass it to axios/fetch.

---

## 🎯 Final Takeaway

**AbortSignal is a web standard that React Query leverages to cancel in-flight requests when they're no longer needed.**

- ✅ Prevents memory leaks
- ✅ Saves bandwidth
- ✅ Improves performance
- ✅ Prevents race conditions
- ✅ Automatic cleanup

**Use it in ALL your query functions for production-ready React Query apps!** 🚀
