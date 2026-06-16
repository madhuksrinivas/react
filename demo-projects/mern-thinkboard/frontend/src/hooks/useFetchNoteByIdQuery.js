import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchNoteById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
  return response.data;
};

export const useFetchNoteByIdQuery = (id) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
  });
};
