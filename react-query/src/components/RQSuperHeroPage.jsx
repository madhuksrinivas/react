import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroQuery } from "../hooks/useSuperHeroQuery";

export default function RQSuperHeroPage() {
  const { heroId } = useParams();

  const { isLoading, isError, data, error } = useSuperHeroQuery({ heroId });

  const handleButtonClick = () => {
    window.history.back();
  };
  return isLoading ? (
    <h2>Loading...</h2>
  ) : isError ? (
    <>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </>
  ) : (
    <div>
      <h2>RQSuperHeroPage</h2>
      <p>Hero Name - {data.name}</p>
      <p>Hero Alter Ego - {data.alterEgo}</p>
      <button onClick={handleButtonClick}>Back</button>
    </div>
  );
}
