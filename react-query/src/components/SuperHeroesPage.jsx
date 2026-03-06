import axios from "axios";
import { useState, useEffect } from "react";

export const SuperHeroesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading data...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return (
          <div key={hero.id}>
            {hero.name} - {hero.alterEgo}
          </div>
        );
      })}
    </>
  );
};
