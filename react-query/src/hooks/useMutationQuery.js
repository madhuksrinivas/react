import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

// wrapper function
const fetchSuperHeros = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return await request({ url: "superheroes" });
};

export const useFetchSuperHerosQuery = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeros,
    onSuccess,
    onError,
  });
};

const addSuperHero = async (hero) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await request({ url: "superheroes", method: "post", data: hero });
};

export const useAddSuperHeroQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero,

    onMutate: async (newHero) => {
      // Cancel all ongoing refetches to avoid overwriting optimistic update
      // Cancel to prevent race conditions from: refetchOnWindowFocus,refetchOnMount,refetchOnReconnect
      await queryClient.cancelQueries({ queryKey: ["super-heroes"] });
      // Save snapshot for rollback
      const previousHeros = queryClient.getQueryData(["super-heroes"]);
      // Optimistic update with temporary ID
      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        // If oldQueryData doesn't exist, return array with new hero
        if (!oldQueryData || !Array.isArray(oldQueryData)) {
          return [{ ...newHero, id: `temp-${Date.now()}` }];
        }
        // Add new hero with temporary ID to existing array
        const optimisticHero = { ...newHero, id: `temp-${Date.now()}` };
        console.log("Optimistically adding hero:", optimisticHero);
        return [...oldQueryData, optimisticHero];
      });
      return { previousHeros };
    },

    onError: (_error, _newHero, context) => {
      // Rollback on error
      if (context?.previousHeros) {
        queryClient.setQueryData(["super-heroes"], context.previousHeros);
      }
    },

    // onSuccess: (data, variables, context) => {
    //     // Parameter 1: data = Server response from axios
    //     // Axios wraps response in { data: actualData }
    //     console.log("Server response:", data);
    //     console.log("New hero from server:", data.data);

    //     // Parameter 2: variables = What you passed to mutate()
    //     console.log("Variables sent:", variables);

    //     // Parameter 3: context = What onMutate returned
    //     console.log("Context from onMutate:", context);

    //     // Manually update cache by adding the new hero
    //     queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
    //         // If oldQueryData doesn't exist, return array with new hero
    //         if (!oldQueryData || !Array.isArray(oldQueryData)) {
    //             return [data.data];
    //         }
    //         // Add new hero to existing array
    //         return [...oldQueryData, data.data];
    //     });
    // },

    onSettled: () => {
      // Always refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};

const handleDeleteHero = async (heroId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await request({ url: `superheroes/${heroId}`, method: "delete" });
};

export const useDeleteSuperHeroQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDeleteHero,
    onMutate: async (heroId) => {
      await queryClient.cancelQueries({ queryKey: ["super-heroes"] });
      const previousHeros = queryClient.getQueryData(["super-heroes"]);
      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        if (!oldQueryData || !Array.isArray(oldQueryData)) {
          return [];
        }
        return oldQueryData.filter((hero) => hero.id !== heroId);
      });
      return { previousHeros };
    },
    onError: (error, _heroId, context) => {
      console.error("Error deleting hero:", error);
      // Rollback on error
      if (context?.previousHeros) {
        queryClient.setQueryData(["super-heroes"], context.previousHeros);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
