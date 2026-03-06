import { useQuery } from "@tanstack/react-query";
import axios from "axios";


// wrapper function
const fetchSuperHeros = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.get("http://localhost:4000/superheroes");
    return response.data;
};

export const useSuperHerosQuery = ({onSuccess, onError, refetchTime}) => {
    return useQuery({
        queryKey: ["super-heroes"],
        queryFn: fetchSuperHeros,
        // cacheTime: 5000, // data will be fresh for 5 seconds; default is 5 minutes
        // staleTime: 30000, // data will be fresh for 30 seconds; default is 0 seconds
        // refetchOnMount: true, // always refetch when component mounts; default is true
        // refetchOnWindowFocus: "always", // always refetch when window is focused; default is true
    
        // polling - A technique where your application automatically fetches data
        //  from the server at regular, fixed intervals to check for updates.
        refetchInterval: refetchTime, // refetch data every 2 seconds; default is false
        // refetchIntervalInBackground: true, // continue refetching even when window is not focused; default is false
    
        // enabled: false, // disable automatic query execution; default is true
    
        // callbacks
        onSuccess,
        onError,
    
        // with data transformation
        // select: (data) => {
        //   const superHeroNames = data.map((hero) => hero.name);
        //   return superHeroNames;
        // },
      });
}