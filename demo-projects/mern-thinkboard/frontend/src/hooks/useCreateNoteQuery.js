import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { NOTES_API_URL } from "../config/api";

const createNote = async ({ title, content }) => {
  const response = await axios.post(NOTES_API_URL, {
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
