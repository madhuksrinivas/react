import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchNotes = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get("http://localhost:5000/api/notes");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching notes: " + error.message);
  }
};

export const useFetchNotesQuery = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
};
