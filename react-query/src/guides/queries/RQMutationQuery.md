# RQMutations Component - Comprehensive Guide

## Overview

Demonstrates **React Query mutations** for adding superheroes with proper cache management, race condition prevention, and error handling.

## Purpose

- Show how to use `useMutation` for POST/PUT/DELETE operations
- Demonstrate form handling with mutations
- Explain cache invalidation after mutations
- Prevent race conditions with `cancelQueries`
- Handle loading and error states

---

## Implementation

```jsx
import { useState } from "react";
import {
  useFetchSuperHerosQuery,
  useAddSuperHeroQuery,
} from "../hooks/useMutationQuery";
import { Link } from "react-router-dom";

export default function RQMutations() {
  const [refetchTime, setRefecthTime] = useState(3000);

  const onSuccess = (data) => data.length === 4 && setRefecthTime(0);
  const onError = (error) => setRefecthTime(0);

  // Fetch heroes list
  const { isLoading, isFetching, data, isError, error, refetch } =
    useFetchSuperHerosQuery({
      onSuccess,
      onError,
    });

  // Add hero mutation
  const {
    mutate: addHero,
    isPending,
    isError: addHeroError,
    error: heroError,
  } = useAddSuperHeroQuery();

  const handleFormSubmitAction = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const heroName = formData.get("heroName");
    const alterEgo = formData.get("alterEgo");

    // ⚠️ IMPORTANT: Don't provide id - let JSON Server auto-generate it
    const hero = { name: heroName, alterEgo: alterEgo };
    addHero(hero); // Trigger mutation
    e.target.reset(); // Clear form
  };

  return (
    <>
      <h2>RQMutations</h2>
      <form onSubmit={handleFormSubmitAction}>
        <div>
          <label htmlFor="heroName">Hero name:</label>
          <input type="text" id="heroName" name="heroName" />
        </div>
        <div>
          <label htmlFor="alterEgo">Alter ego:</label>
          <input type="text" id="alterEgo" name="alterEgo" />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Hero"}
        </button>
        {isPending && <p>Adding hero...</p>}
      </form>

      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}

      <button onClick={refetch}>Fetch heroes</button>
    </>
  );
}
```

---

## Key Concept: Mutations in React Query

### What is a Mutation?

A **mutation** is any operation that **changes data** on the server:

- ✅ POST - Create new data
- ✅ PUT/PATCH - Update existing data
- ✅ DELETE - Remove data

Unlike queries (GET requests), mutations:

- Don't run automatically on mount
- Only run when you call `mutate()`
- Don't cache responses by default
- Need manual cache updates

---

## The Custom Hook: `useAddSuperHeroQuery`

```javascript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addSuperHero = async (hero) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return await axios.post("http://localhost:4000/superheroes", hero);
};

export const useAddSuperHeroQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSuperHero,

    onMutate: async (newHero) => {
      // Cancel ongoing refetches to prevent race conditions
      await queryClient.cancelQueries({
        queryKey: ["super-heroes"],
      });

      // Save snapshot for potential rollback
      const previousHeros = queryClient.getQueryData(["super-heroes"]);

      // ⚠️ IMPORTANT: Add temporary ID for optimistic update
      // Real ID will come from server after onSettled refetch
      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        if (!oldQueryData || !Array.isArray(oldQueryData)) {
          return [{ ...newHero, id: `temp-${Date.now()}` }];
        }
        return [...oldQueryData, { ...newHero, id: `temp-${Date.now()}` }];
      });

      return { previousHeros };
    },

    onError: (err, newHero, context) => {
      // Rollback on error
      if (context?.previousHeros) {
        queryClient.setQueryData(["super-heroes"], context.previousHeros);
      }
    },

    onSettled: () => {
      // Always refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
```

---

## Critical: ID Generation Strategy & Preventing 404 Errors

### The Problem with Client-Generated IDs

```javascript
// ❌ WRONG - Can cause 404 errors on delete
const hero = {
  name: heroName,
  alterEgo: alterEgo,
  id: Date.now(), // Client-generated ID
};
addHero(hero);
```

**Why this fails:**

1. You add a hero with ID `1772780366643` (from `Date.now()`)
2. It's optimistically added to cache with this ID
3. You try to delete it **before** the server sync completes
4. Server doesn't have this ID → **404 Not Found Error**

### The Solution

```javascript
// ✅ CORRECT - Let server generate IDs
const hero = {
  name: heroName,
  alterEgo: alterEgo,
  // No id field - JSON Server auto-generates it
};
addHero(hero);
```

**In the mutation hook (already shown above):**

```javascript
onMutate: async (newHero) => {
    // Add temporary ID for optimistic update only
    queryClient.setQueryData(["super-heroes"], (old) => {
        return [...old, { ...newHero, id: `temp-${Date.now()}` }];
    });
    return { previousHeros };
},

onSettled: () => {
    // Refetch replaces temp hero with real server data
    queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
}
```

**Flow:**

1. Add hero **without ID** → Server generates real ID (e.g., `"6"`)
2. Optimistic update shows hero with temp ID (e.g., `"temp-1772780492703"`)
3. `onSettled` refetches from server
4. Cache updates with real hero from server (with real ID)
5. Delete now works because it uses the real server-generated ID

### Optional: Disable Delete for Temporary Heroes

```javascript
// Prevent deleting heroes that haven't synced yet
const isTemporary = hero.id && String(hero.id).startsWith("temp-");

<button
  onClick={() => deleteHero(hero.id)}
  disabled={isTemporary}
  style={{ opacity: isTemporary ? 0.5 : 1 }}
  title={isTemporary ? "Syncing with server..." : "Delete hero"}
>
  Delete
</button>;
```

---

## Delete Mutation Implementation

### The Delete Hook

```javascript
const handleDeleteHero = async (heroId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await request({ url: `superheroes/${heroId}`, method: "delete" });
};

export const useDeleteSuperHeroQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDeleteHero,

    onMutate: async (heroId) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: ["super-heroes"] });

      // Save snapshot for rollback
      const previousHeros = queryClient.getQueryData(["super-heroes"]);

      // Optimistically remove from cache
      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        if (!oldQueryData || !Array.isArray(oldQueryData)) {
          return [];
        }
        return oldQueryData.filter((hero) => hero.id !== heroId);
      });

      return { previousHeros };
    },

    onError: (error, heroId, context) => {
      console.error("Error deleting hero:", error);
      // Rollback on error
      if (context?.previousHeros) {
        queryClient.setQueryData(["super-heroes"], context.previousHeros);
      }
    },

    onSettled: () => {
      // Always refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
```

**Key Points:**

- ✅ Single `onError` handler (combines logging and rollback)
- ✅ Optimistic delete removes hero immediately from UI
- ✅ On error, rollback restores the hero
- ✅ `onSettled` ensures cache syncs with server

---

## Mutation Callbacks Deep Dive

### Complete Understanding of Each Callback

React Query mutations provide **4 optional callbacks** that run at different stages of the mutation lifecycle. Understanding what each receives and when to use them is crucial.

---

## 1. `onMutate` - Before API Call

### When It Runs

**BEFORE** the API request is sent. Runs **immediately** when you call `mutate()`.

### What It Receives

```javascript
onMutate: async (variables) => {
  // variables = The exact data you passed to mutate()

  // Example:
  // If you called: addHero({ name: "Iron Man", alterEgo: "Tony Stark" })
  // Then variables = { name: "Iron Man", alterEgo: "Tony Stark" }

  // Return value becomes "context" for other callbacks
  return {
    /* anything you want to pass to other callbacks */
  };
};
```

**Parameter Details:**

| Parameter   | Type | Source                        | Example                                           |
| ----------- | ---- | ----------------------------- | ------------------------------------------------- |
| `variables` | Any  | What you passed to `mutate()` | `{ name: "Iron Man", alterEgo: "Tony Stark" }`    |
| **Returns** | Any  | You define it                 | `{ previousHeros: [...], timestamp: Date.now() }` |

### Where `variables` Comes From

```javascript
// In your component:
addHero({ name: "Iron Man", alterEgo: "Tony Stark" });
         ↑
         This object becomes "variables" in onMutate
```

### Use Cases

✅ **When to use `onMutate`:**

1. **Cancel ongoing queries** (prevent race conditions)

   ```javascript
   await queryClient.cancelQueries({ queryKey: ["super-heroes"] });
   ```

2. **Save snapshot for rollback**

   ```javascript
   const previousHeros = queryClient.getQueryData(["super-heroes"]);
   return { previousHeros }; // Pass to onError for rollback
   ```

3. **Optimistic updates** (instant UI feedback)

   ```javascript
   queryClient.setQueryData(["super-heroes"], (old) => [...old, newHero]);
   ```

4. **Show loading indicators**
   ```javascript
   toast.loading("Adding hero...");
   ```

❌ **When NOT to use:**

- If you don't need race condition prevention
- If you're not doing optimistic updates
- If you don't need to pass context to other callbacks
- **Simple mutations can skip this entirely**

### Complete Example

```javascript
onMutate: async (newHero) => {
  console.log("1. onMutate - Variables received:", newHero);
  // Output: { name: "Iron Man", alterEgo: "Tony Stark" }

  // Cancel queries
  await queryClient.cancelQueries({ queryKey: ["super-heroes"] });

  // Save snapshot
  const previousHeros = queryClient.getQueryData(["super-heroes"]);
  console.log("Saved snapshot:", previousHeros);

  // Optional: Optimistic update
  queryClient.setQueryData(["super-heroes"], (old) => {
    return [...old, { ...newHero, id: "temp", isPending: true }];
  });

  // Return context for other callbacks
  return {
    previousHeros,
    startTime: Date.now(),
    heroName: newHero.name,
  };
};
```

---

## 2. `onSuccess` - After Successful API Call

### When It Runs

**ONLY if** the API call succeeds (status 200-299).

### What It Receives

```javascript
onSuccess: (data, variables, context) => {
  // data = Response from the server
  // variables = What you passed to mutate()
  // context = What onMutate returned
};
```

**Parameter Details:**

| Parameter   | Type | Source                           | Example                                           |
| ----------- | ---- | -------------------------------- | ------------------------------------------------- |
| `data`      | Any  | Server response (axios wraps it) | `{ data: { id: 5, name: "Iron Man", ... } }`      |
| `variables` | Any  | What you passed to `mutate()`    | `{ name: "Iron Man", alterEgo: "Tony Stark" }`    |
| `context`   | Any  | What `onMutate` returned         | `{ previousHeros: [...], startTime: 1234567890 }` |

### Where Each Parameter Comes From

```javascript
┌─────────────────────────────────────────────────────────┐
│ Component calls mutate()                                │
│ addHero({ name: "Iron Man", alterEgo: "Tony Stark" })  │
│         ↓                                               │
│    This becomes "variables"                             │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ onMutate runs                                           │
│ return { previousHeros, timestamp }                     │
│         ↓                                               │
│    This becomes "context"                               │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ Server responds                                         │
│ { id: 5, name: "Iron Man", alterEgo: "Tony Stark" }    │
│         ↓                                               │
│    This becomes "data"                                  │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ onSuccess receives ALL THREE                            │
│ onSuccess(data, variables, context)                     │
└─────────────────────────────────────────────────────────┘
```

### Use Cases

✅ **When to use `onSuccess`:**

1. **Access server-generated ID**

   ```javascript
   const newHeroId = data.data.id;
   navigate(`/heroes/${newHeroId}`);
   ```

2. **Show success message**

   ```javascript
   toast.success(`${variables.name} added successfully!`);
   ```

3. **Manually update cache** (alternative to `invalidateQueries`)

   ```javascript
   queryClient.setQueryData(["super-heroes"], (old) => [...old, data.data]);
   ```

4. **Compare sent vs received data**

   ```javascript
   if (data.data.name !== variables.name) {
     console.warn("Server modified the name!");
   }
   ```

5. **Track analytics**
   ```javascript
   analytics.track("Hero Added", {
     name: variables.name,
     duration: Date.now() - context.startTime,
   });
   ```

❌ **When NOT required:**

- If you're using `onSettled` for cache invalidation
- If you don't need success-specific logic
- **Most simple mutations can skip this**

### Complete Example

```javascript
onSuccess: (data, variables, context) => {
  console.log("2. onSuccess triggered!");

  // Parameter 1: Server response
  console.log("Server response:", data);
  // Output: { data: { id: 5, name: "Iron Man", alterEgo: "Tony Stark" } }

  const newHeroId = data.data.id;
  console.log("Server assigned ID:", newHeroId); // 5

  // Parameter 2: What we sent
  console.log("What we sent:", variables);
  // Output: { name: "Iron Man", alterEgo: "Tony Stark" }

  // Parameter 3: Context from onMutate
  console.log("Context:", context);
  // Output: { previousHeros: [...], startTime: 1234567890, heroName: "Iron Man" }

  // Use cases:
  toast.success(`${variables.name} added with ID ${newHeroId}!`);

  const duration = Date.now() - context.startTime;
  console.log(`Mutation took ${duration}ms`);

  // Navigate to new hero page
  navigate(`/rq-super-heroes/${newHeroId}`);
};
```

---

## 3. `onError` - After Failed API Call

### When It Runs

**ONLY if** the API call fails (network error, status 400+, timeout, etc.).

### What It Receives

```javascript
onError: (error, variables, context) => {
  // error = Error object from the failed request
  // variables = What you passed to mutate()
  // context = What onMutate returned
};
```

**Parameter Details:**

| Parameter   | Type  | Source                        | Example                                                           |
| ----------- | ----- | ----------------------------- | ----------------------------------------------------------------- |
| `error`     | Error | Failed request                | `Error: Network Error` or `Error: Request failed with status 500` |
| `variables` | Any   | What you passed to `mutate()` | `{ name: "Iron Man", alterEgo: "Tony Stark" }`                    |
| `context`   | Any   | What `onMutate` returned      | `{ previousHeros: [...], startTime: 1234567890 }`                 |

### Where Each Parameter Comes From

```javascript
┌─────────────────────────────────────────────────────────┐
│ Component calls mutate()                                │
│ addHero({ name: "Iron Man", alterEgo: "Tony Stark" })  │
│         ↓                                               │
│    This becomes "variables"                             │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ onMutate runs                                           │
│ return { previousHeros }                                │
│         ↓                                               │
│    This becomes "context"                               │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ Server request FAILS                                    │
│ Network error / 500 error / Timeout                     │
│         ↓                                               │
│    This becomes "error"                                 │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ onError receives ALL THREE                              │
│ onError(error, variables, context)                      │
└─────────────────────────────────────────────────────────┘
```

### Use Cases

✅ **When to use `onError`:**

1. **Rollback optimistic updates**

   ```javascript
   if (context?.previousHeros) {
     queryClient.setQueryData(["super-heroes"], context.previousHeros);
   }
   ```

2. **Show error messages**

   ```javascript
   toast.error(`Failed to add ${variables.name}: ${error.message}`);
   ```

3. **Log errors**

   ```javascript
   errorLogger.log({
     action: "Add Hero",
     error: error.message,
     payload: variables,
   });
   ```

4. **Retry logic**
   ```javascript
   if (error.response?.status === 503) {
     setTimeout(() => mutate(variables), 3000); // Retry after 3s
   }
   ```

❌ **When NOT required:**

- If you're not doing optimistic updates (no rollback needed)
- If you're handling errors in the component instead
- **Simple mutations can skip this**

### Complete Example

```javascript
onError: (error, variables, context) => {
  console.log("3. onError triggered!");

  // Parameter 1: Error object
  console.log("Error:", error);
  // Output: Error: Network Error
  console.log("Error message:", error.message);
  console.log("Error response:", error.response?.data);

  // Parameter 2: What we tried to send
  console.log("Attempted to add:", variables);
  // Output: { name: "Iron Man", alterEgo: "Tony Stark" }

  // Parameter 3: Context from onMutate (for rollback)
  console.log("Context:", context);
  // Output: { previousHeros: [...], startTime: 1234567890 }

  // Use case 1: Rollback optimistic update
  if (context?.previousHeros) {
    queryClient.setQueryData(["super-heroes"], context.previousHeros);
    console.log("Rolled back to previous state");
  }

  // Use case 2: Show user-friendly error
  if (error.response?.status === 409) {
    toast.error(`${variables.name} already exists!`);
  } else if (error.message === "Network Error") {
    toast.error("No internet connection. Please try again.");
  } else {
    toast.error(`Failed to add ${variables.name}: ${error.message}`);
  }

  // Use case 3: Log error
  console.error("Mutation failed:", {
    hero: variables,
    error: error.message,
    timestamp: new Date().toISOString(),
  });
};
```

---

## 4. `onSettled` - Always Runs After Mutation

### When It Runs

**ALWAYS** runs, whether the mutation succeeded or failed. Runs **after** `onSuccess` or `onError`.

### What It Receives

```javascript
onSettled: (data, error, variables, context) => {
  // data = Server response (if success) OR undefined (if error)
  // error = Error object (if failed) OR undefined (if success)
  // variables = What you passed to mutate()
  // context = What onMutate returned
};
```

**Parameter Details:**

| Parameter   | Type                 | Source                      | Example                                        |
| ----------- | -------------------- | --------------------------- | ---------------------------------------------- |
| `data`      | Any or `undefined`   | Server response if success  | `{ data: { id: 5, ... } }` or `undefined`      |
| `error`     | Error or `undefined` | Error object if failed      | `Error: Network Error` or `undefined`          |
| `variables` | Any                  | What you passed to mutate() | `{ name: "Iron Man", alterEgo: "Tony Stark" }` |
| `context`   | Any                  | What `onMutate` returned    | `{ previousHeros: [...] }`                     |

### Where Each Parameter Comes From

```javascript
┌─────────────────────────────────────────────────────────┐
│ Success Path                    Error Path              │
├─────────────────────────────────────────────────────────┤
│ data = server response          data = undefined        │
│ error = undefined               error = error object    │
│                                                         │
│ Both paths receive:                                     │
│ - variables (from mutate call)                          │
│ - context (from onMutate return)                        │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ onSettled receives ALL FOUR parameters                  │
│ onSettled(data, error, variables, context)              │
└─────────────────────────────────────────────────────────┘
```

### Use Cases

✅ **When to use `onSettled`:**

1. **Refetch to sync with server** (most common)

   ```javascript
   queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
   ```

2. **Cleanup operations** (always needed)

   ```javascript
   toast.dismiss("loading-toast");
   setIsProcessing(false);
   ```

3. **Handle both success and error** (instead of separate callbacks)

   ```javascript
   if (error) {
     toast.error("Failed!");
   } else {
     toast.success("Success!");
   }
   ```

4. **Analytics/logging** (track all mutations)
   ```javascript
   analytics.track("Mutation Completed", {
     success: !error,
     duration: Date.now() - context.startTime,
   });
   ```

✅ **When REQUIRED:**

- **If you need cache invalidation** - This is where you usually do it
- **If you need cleanup that runs regardless of outcome**

❌ **When NOT required:**

- If you're manually updating cache in `onSuccess` and don't need it for errors
- Very rare - most mutations should use `onSettled`

### Complete Example

```javascript
onSettled: (data, error, variables, context) => {
  console.log("4. onSettled - Always runs!");

  // Check which path we took
  if (error) {
    console.log("Mutation FAILED");
    console.log("Error:", error.message);
    console.log("data is undefined:", data); // undefined
  } else {
    console.log("Mutation SUCCEEDED");
    console.log("Data:", data.data);
    console.log("error is undefined:", error); // undefined
  }

  // These are always available:
  console.log("Variables:", variables);
  // Output: { name: "Iron Man", alterEgo: "Tony Stark" }

  console.log("Context:", context);
  // Output: { previousHeros: [...], startTime: 1234567890 }

  // Use case 1: Invalidate cache (most common)
  queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
  console.log("Cache invalidated - will refetch");

  // Use case 2: Cleanup
  toast.dismiss("loading");

  // Use case 3: Handle both outcomes
  if (error) {
    toast.error(`Failed: ${error.message}`);
  } else {
    toast.success(`${variables.name} added successfully!`);
  }

  // Use case 4: Analytics
  const duration = Date.now() - context.startTime;
  analytics.track("Add Hero Mutation", {
    success: !error,
    heroName: variables.name,
    duration: duration,
  });
};
```

---

## Callback Execution Order Summary

```
User calls: addHero({ name: "Iron Man", alterEgo: "Tony Stark" })
        ↓
┌─────────────────────────────────────────────────────────┐
│ 1. onMutate                                             │
│    Receives: (variables)                                │
│    - variables = { name: "Iron Man", ... }              │
│    Returns: { previousHeros, startTime }                │
└─────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────┐
│ 2. mutationFn (API call)                                │
│    POST /superheroes                                    │
└─────────────────────────────────────────────────────────┘
        ↓
    Success? ──┬── YES ──┬─────────────────────┐
               │         ↓                     ↓
               │  ┌──────────────┐    ┌─────────────────┐
               │  │ 3a. onSuccess│    │ 4. onSettled    │
               │  │ (data,       │    │ (data = {...},  │
               │  │  variables,  │    │  error = undef, │
               │  │  context)    │    │  variables,     │
               │  └──────────────┘    │  context)       │
               │                      └─────────────────┘
               │
               └── NO ───┬─────────────────────┐
                         ↓                     ↓
                  ┌──────────────┐    ┌─────────────────┐
                  │ 3b. onError  │    │ 4. onSettled    │
                  │ (error,      │    │ (data = undef,  │
                  │  variables,  │    │  error = {...}, │
                  │  context)    │    │  variables,     │
                  └──────────────┘    │  context)       │
                                      └─────────────────┘
```

---

## When Each Callback is Required

| Callback    | Required?          | Use When                                                                           | Skip When                                                             |
| ----------- | ------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `onMutate`  | ❌ **Optional**    | - Race conditions possible<br>- Need optimistic updates<br>- Need to pass context  | - Simple mutations<br>- No race conditions<br>- No optimistic updates |
| `onSuccess` | ❌ **Optional**    | - Need success-specific logic<br>- Navigate after success<br>- Manual cache update | - Using `onSettled` instead<br>- No success-specific needs            |
| `onError`   | ❌ **Optional**    | - Need to rollback<br>- Custom error handling<br>- Error logging                   | - No optimistic updates<br>- Handling errors in component             |
| `onSettled` | ⚠️ **Recommended** | - Need cache invalidation<br>- Cleanup operations<br>- Track all outcomes          | - Manually updating cache elsewhere<br>- Very rare to skip            |

---

## Minimal vs Complete Examples

### Minimal (Just `onSettled`) ✅ Recommended for most cases

```javascript
export const useAddSuperHeroQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
```

**Use this when:**

- Simple CRUD operations
- No need for optimistic updates
- No special error handling needed

---

### Complete (All callbacks)

```javascript
export const useAddSuperHeroQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero,

    onMutate: async (newHero) => {
      await queryClient.cancelQueries({ queryKey: ["super-heroes"] });
      const previousHeros = queryClient.getQueryData(["super-heroes"]);

      // Optimistic update
      queryClient.setQueryData(["super-heroes"], (old) => {
        return [...old, { ...newHero, id: "temp", isPending: true }];
      });

      return { previousHeros };
    },

    onSuccess: (data, variables, context) => {
      toast.success(`${variables.name} added with ID ${data.data.id}!`);
      navigate(`/heroes/${data.data.id}`);
    },

    onError: (error, variables, context) => {
      // Rollback optimistic update
      queryClient.setQueryData(["super-heroes"], context.previousHeros);
      toast.error(`Failed to add ${variables.name}: ${error.message}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
```

**Use this when:**

- Need instant UI feedback (optimistic updates)
- Complex error handling
- Need to navigate after success
- Production-ready social media features

---

## Real-World Decision Tree

```
Do you need instant UI updates?
        │
        ├─ YES → Use onMutate (optimistic updates)
        │        + onError (rollback)
        │        + onSettled (sync with server)
        │
        └─ NO → Do you need success-specific logic?
                │
                ├─ YES → Use onSuccess (navigate, toast)
                │        + onSettled (invalidate cache)
                │
                └─ NO → Just use onSettled
                        (simplest approach ✅)
```

---

## Summary: Callback Parameters

| Callback    | Param 1             | Param 2              | Param 3     | Param 4   |
| ----------- | ------------------- | -------------------- | ----------- | --------- |
| `onMutate`  | `variables`         | -                    | -           | -         |
| `onSuccess` | `data`              | `variables`          | `context`   | -         |
| `onError`   | `error`             | `variables`          | `context`   | -         |
| `onSettled` | `data \| undefined` | `error \| undefined` | `variables` | `context` |

**Key Points:**

- All callbacks receive `variables` (what you passed to `mutate()`)
- All except `onMutate` receive `context` (what `onMutate` returned)
- `onMutate` returns `context` for other callbacks
- `onSettled` receives both `data` and `error` (one is always `undefined`)

---
