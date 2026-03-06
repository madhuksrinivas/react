import { useState } from "react";
import {
  useFetchSuperHerosQuery,
  useAddSuperHeroQuery,
  useDeleteSuperHeroQuery,
} from "../hooks/useMutationQuery";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function RQMutations() {
  const [refetchTime, setRefecthTime] = useState(3000);
  const queryClient = useQueryClient(); // Add this

  const onSuccess = (data) => data.length === 4 && setRefecthTime(0); // stop refetching

  const onError = (error) => setRefecthTime(0);

  const { isLoading, isFetching, data, isError, error, refetch } =
    useFetchSuperHerosQuery({
      onSuccess,
      onError,
    });

  const {
    data: mutationData,
    mutate: addHero,
    isPending,
    isError: addHeroError,
    error: heroError,
  } = useAddSuperHeroQuery();

  const {
    mutate: deleteHero,
    isPending: isDeleting,
    isError: deleteError,
    error: deleteHeroError,
  } = useDeleteSuperHeroQuery();

  //   console.log("Hero added successfully:", mutationData);

  const handleFormSubmitAction = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const heroName = formData.get("heroName");
    const alterEgo = formData.get("alterEgo");
    console.log(heroName, alterEgo);
    // Don't provide id - let JSON Server auto-generate it
    const hero = { name: heroName, alterEgo: alterEgo };

    // ✅ Call mutate directly - it only runs when this function is called
    addHero(hero);
    e.target.reset();
  };

  const handleDeleteHero = (heroId) => {
    // Call the deleteHero mutation
    deleteHero(heroId);
  };

  // Add this function
  const clearCache = () => {
    queryClient.clear();
    window.location.reload();
  };

  console.log("error", error?.message);
  console.log("heroError", heroError?.message);
  console.log("data type:", typeof data, "is array:", Array.isArray(data)); // Debug log

  // Handle loading state
  isLoading && <h2>Loading...</h2>;
  // Handle error state
  isError && (
    <>
      <h2>Error loading heroes!</h2>
      <p>{error?.message}</p>
      <button onClick={refetch}>Retry</button>
    </>
  );
  isDeleting && <h2>Deleting hero...</h2>;
  deleteError && (
    <>
      <h2>Error deleting hero!</h2>
      <p>{deleteHeroError?.message}</p>
    </>
  );

  return (
    <>
      <h2>RQMutations</h2>
      <h2>React Query Super Heroes Page</h2>
      <form onSubmit={handleFormSubmitAction}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label htmlFor="heroName">Hero name:</label>
            <input
              type="text"
              id="heroName"
              name="heroName"
              style={{ width: "30%", marginLeft: "12px" }}
            />
          </div>
          <div>
            <label htmlFor="alterEgo">Alter ego:</label>
            <input
              type="text"
              id="alterEgo"
              name="alterEgo"
              style={{ width: "30%", marginLeft: "12px" }}
            />
          </div>
        </div>
        <button type="submit" style={{ margin: "20px 20px" }}>
          Add Hero
        </button>
        {isPending && <h2>Adding hero...</h2>}
      </form>

      {heroError && <h2>Error: {heroError?.message}</h2>}

      {/* Safe check: only map if data is an array */}
      {Array.isArray(data) &&
        data.map((hero) => {
          return (
            <div
              key={hero.id}
              style={{ display: "flex", alignItems: "center", gap: "5%" }}
            >
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
              <button
                onClick={() => handleDeleteHero(hero.id)}
                style={{ padding: "0.3%" }}
              >
                Delete
              </button>
            </div>
          );
        })}

      {/* Show warning if data is not an array */}
      {!Array.isArray(data) && data && (
        <p style={{ color: "red" }}>
          Cache corrupted! Data is not an array.
          <button onClick={refetch}>Refetch</button>
          <button onClick={clearCache}>Clear Cache</button>
        </p>
      )}

      <button onClick={refetch} style={{ margin: "20px 20px" }}>
        Fetch heros
      </button>
    </>
  );
}
