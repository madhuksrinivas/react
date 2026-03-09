import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEventById, editEventById } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event", eventId],
    queryFn: ({ signal }) => fetchEventById({ signal, eventId }),
  });

  const mutation = useMutation({
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey: ["events"] });
      queryClient.cancelQueries({ queryKey: ["event", eventId] });

      const previousEvents = queryClient.getQueryData(["events"]);
      const previousEvent = queryClient.getQueryData(["event", eventId]);

      queryClient.setQueriesData({ queryKey: ["events", eventId] }, (old) => {
        return { event: { ...old.event, ...mutation.variables } };
      });

      return { previousEvents, previousEvent };
    },
    mutationFn: (formData) => {
      return editEventById({ id: eventId, eventData: formData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", eventId] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("../");
    },
    onError: (_error, _variables, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(["events"], context.previousEvents);
      }
      if (context?.previousEvent) {
        queryClient.setQueryData(["event", eventId], context.previousEvent);
      }
    },
  });

  function handleSubmit(formData) {
    mutation.mutate(formData);
  }
  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data.event} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
