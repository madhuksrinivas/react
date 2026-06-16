import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateNote = async ({ id, title, content }) => {
  const response = await axios.patch(`http://localhost:5000/api/notes/${id}`, {
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
