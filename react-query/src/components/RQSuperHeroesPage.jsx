import React from "react";
import { useSuperHerosQuery } from "../hooks/useSuperHerosQuery";
import { Link } from "react-router-dom";
export const RQSuperHeroesPage = () => {
  const [refetchTime, setRefecthTime] = React.useState(3000);

  const onSuccess = (data) => {
    // console.log("Perform side effect after data fetching", data);
    if (data && Array.isArray(data) && data.length === 4) {
      setRefecthTime(0); // stop refetching
    }
  };

  const onError = (error) => {
    // console.log("Perform side effect after encountering error", error);
    setRefecthTime(0);
  };

  const { isLoading, isFetching, data, isError, error, refetch } =
    // custom react query hook
    useSuperHerosQuery({
      onSuccess,
      onError,
      refetchInterval: refetchTime, // Poll every 3 seconds
    });

  // console.log("data:", data);
  // console.log(isLoading, isFetching);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError)
    return (
      <>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
      </>
    );

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* without data transformation: */}
      {Array.isArray(data) && data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* with data transformation: */}
      {/* {data?.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })} */}
      <button onClick={refetch}>Fetch heros</button>
    </>
  );
};
