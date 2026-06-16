import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NOTES_API_URL } from "../config/api";

const fetchNotes = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get(NOTES_API_URL);
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
