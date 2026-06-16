import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createNote = async ({ title, content }) => {
  const response = await axios.post("http://localhost:5000/api/notes", {
    title,
    content,
  });

  return response.data;
};

export const useCreateNoteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
