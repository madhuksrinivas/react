import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = () => axios.get("http://localhost:4000/superheroes");
const fetchFriends = () => axios.get("http://localhost:4000/friends");

export default function RQParallelQueriesPage() {
  const { data: superHeros } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeros,
  });
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });
  return (
    <div>
      <h2>RQParallelQueriesPage</h2>
      <div
        style={{
          display: "flex",
          gap: "50px",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>SuperHeros</p>
          <ul>
            {superHeros?.data?.map((hero) => {
              return <li key={hero.id}>{hero.name}</li>;
            })}
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Friends</p>
          <ul>
            {friends?.data?.map((friend) => {
              return <li key={friend.id}>{friend.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
