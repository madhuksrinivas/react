import { Fragment } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchColors = async ({ pageParam = 1 }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return await axios
    .get(`http://localhost:4000/colors?_page=${pageParam}&_per_page=2`)
    .then((res) => res.data);
};

function RQInfiniteQueriesPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (latestPage, allpages) => {
      console.log("lastPage", latestPage); // lastPage = The page we JUST fetched
      console.log("allpages", allpages); // allPages = Array of ALL pages fetched so far
      // Return next page number OR undefined to stop
      return latestPage?.next ?? undefined;
    },
  });

  console.log("data", data);
  console.log("isFetching", isFetching);
  console.log("isFetchingNextPage", isFetchingNextPage);
  console.log("hasNextPage", hasNextPage);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : isError ? (
    <h2>{error.message}</h2>
  ) : (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>InfiniteQueriesPage</h2>
      {data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group?.data?.map((color) => (
            <div key={color.id} style={{ color: color.label }}>
              <h2>
                {color.id} - {color.label}
              </h2>
            </div>
          ))}
        </Fragment>
      ))}
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
        {isFetchingNextPage && <p>Loading more colors...</p>}
        {isFetching && !isFetchingNextPage && <p>Refreshing data...</p>}
      </div>
    </div>
  );
}

export default RQInfiniteQueriesPage;
