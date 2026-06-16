import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { NOTES_API_URL } from "../config/api";

const updateNote = async ({ id, title, content }) => {
  const response = await axios.patch(`${NOTES_API_URL}/${id}`, {
    title,
    content,
  });
  return response.data;
};

export const useUpdateNoteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      await queryClient.invalidateQueries({ queryKey: ["notes", id] });
    },
  });
};
