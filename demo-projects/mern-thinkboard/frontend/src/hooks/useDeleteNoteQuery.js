import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteNote = async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/notes/${id}`);
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
