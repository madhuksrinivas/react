import React from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// const fetchSuperHero = async ({queryKey}) => {
//     const heroId = queryKey[1];
//     const response = await axios.get(`http://localhost:4000/superheroes/${heroId}`);
//     return response.data;
// }

// alternative way
const fetchSuperHero = async ({ heroId }) => {
  const response = await axios.get(
    `http://localhost:4000/superheroes/${heroId}`
  );
  return response.data;
};

export const useSuperHeroQuery = ({ heroId }) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["super-hero", heroId],
    // queryFn: fetchSuperHero,
    queryFn: () => fetchSuperHero({ heroId }), // Pass heroId as an object

    // initial Query Data first checks if the data is already present in the cache otherwise it will call fetchSuperHero API
    initialData: () => {
      const hero = queryClient
        .getQueryData(["super-heroes"])
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) return { data: hero };
      else return undefined;
    },
  });
};
