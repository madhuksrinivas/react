import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NOTES_API_URL } from "../config/api";

const fetchNoteById = async (id) => {
  const response = await axios.get(`${NOTES_API_URL}/${id}`);
  return response.data;
};

export const useFetchNoteByIdQuery = (id) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
  });
};
