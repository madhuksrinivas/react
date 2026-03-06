import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperhero = ({ signal, heroId }) => {
  console.log(`🚀 Starting fetch for hero ${heroId}`);
  
  return axios.get(`http://localhost:4000/superheroes/${heroId}`, { signal })
    .then(response => {
      console.log(`✅ Completed fetch for hero ${heroId}`);
      return response;
    })
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log(`❌ CANCELLED fetch for hero ${heroId}`);
      } else {
        console.log(`⚠️ Error fetching hero ${heroId}:`, error.message);
      }
      throw error;
    });
};

export default function RQDynamicParallelQueries({ heroIds }) {
  const queryResult = useQueries({
    queries: heroIds.map((heroId) => {
      return {
        queryKey: ["super-hero", heroId],
        queryFn: ({ signal }) => fetchSuperhero({ signal, heroId: heroId }),
      };
    }),
  });

  //   useQueries returns an array of query results
  console.log(queryResult);
  //   console.table(queryResult.map((q) => q.data?.data));
  return (
    <div>
      <h2>RQDynamicParallelQueries</h2>
      {queryResult.map(({ data, isLoading, error }, index) => {
        return isLoading ? (
          <p key={heroIds[index]}>Loading hero {heroIds[index]}...</p>
        ) : error ? (
          <p key={heroIds[index]}>
            Error loading hero {heroIds[index]} : {error.message}
          </p>
        ) : (
          <div key={data.data.id}>
            <p>
              {data.data.id}. {data.data.name} - {data.data.alterEgo}
            </p>
          </div>
        );
      })}
    </div>
  );
}
