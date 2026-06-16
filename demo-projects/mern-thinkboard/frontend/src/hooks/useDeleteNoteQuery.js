import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { NOTES_API_URL } from "../config/api";

const deleteNote = async (id) => {
  const response = await axios.delete(`${NOTES_API_URL}/${id}`);
  return response.data;
};

export const useDeleteNoteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      await queryClient.invalidateQueries({ queryKey: ["notes", id] });
    },
  });
};
