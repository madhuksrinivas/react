import React from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchColors = async (pageNumber) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return await axios
    .get(`http://localhost:4000/colors?_page=${pageNumber}&_per_page=2`)
    .then((res) => res.data);
};
function RQPaginationQueriesPage() {
  //   const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = React.useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    keepPreviousData: true, // Retain previous data while fetching new data
    // staleTime: 30000, // Data is considered fresh for 30 seconds

    // initialData: () => {
    //   const colors = queryClient.getQueryData(["colors", pageNumber]);

    //   if (colors) return { data: colors };
    //   else return undefined;
    // },
  });

  const handlePreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  console.log("data", data);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : isError ? (
    <>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </>
  ) : (
    <div>
      <h2>Pagination Queries Page</h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        {data?.data?.map((color) => (
          <p key={color.id}>
            {color.id} - {color.label}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={handlePreviousPage}
          disabled={data?.prev === null || pageNumber === 1}
        >
          ＜
        </button>
        page {pageNumber}
        <button onClick={handleNextPage} disabled={data?.next === null}>
          ＞
        </button>
      </div>
    </div>
  );
}

export default RQPaginationQueriesPage;
