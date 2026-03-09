import { Link, Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../Header.jsx";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchEventById, deleteEventById } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event", eventId],
    queryFn: ({ signal }) => fetchEventById({ signal, eventId: eventId }),
    initialData: () => {
      const cachedEvents = queryClient.getQueryData(["events"]);
      const event = cachedEvents?.find((e) => e.id === eventId);
      console.log("Cached Event:", event);
      return event ? { event } : undefined;
    },
  });

  const {
    mutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEventById,
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["events"] });
      await queryClient.cancelQueries({ queryKey: ["event", eventId] });

      // Snapshot the previous values
      const previousEvents = queryClient.getQueryData(["events"]);
      const previousEvent = queryClient.getQueryData(["event", eventId]);

      // Optimistically update to remove the event from list
      queryClient.setQueryData(["events"], (old) => {
        return old?.filter((event) => event.id !== eventId);
      });

      // Return context with snapshot values
      return { previousEvents, previousEvent };
    },
    onError: (_error, _variables, context) => {
      // Rollback to previous values on error
      if (context?.previousEvents) {
        queryClient.setQueryData(["events"], context.previousEvents);
      }
      if (context?.previousEvent) {
        queryClient.setQueryData(["event", eventId], context.previousEvent);
      }
    },
    onSuccess: () => {
      // Navigate after successful delete
      navigate("/events");
    },
    onSettled: () => {
      // Refetch to ensure server state is synchronized
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    },
  });

  const handleDeleteEvent = () => {
    setIsDeleting(true);
  };

  console.log("Event Data:", data?.event);

  let content;

  if (isLoading) {
    content = (
      <div id="event-details-content" className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to fetch event"
          message={
            error.info?.message ||
            "Failed to fetch event. Please try again later."
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data?.event?.date).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        year: "numeric",
        month: "long",
      }
    );
    content = (
      <article id="event-details">
        <header>
          <h1>{data.event.title}</h1>
          <nav>
            <button onClick={handleDeleteEvent}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img
            src={`http://localhost:3000/${data.event.image}`}
            alt={data.event.title}
          />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.event.location}</p>
              <time dateTime={`${data.event.date}T${data.event.time}`}>
                {formattedDate} @ {data.event.time}
              </time>
            </div>
            <p id="event-details-description">{data.event.description}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={() => setIsDeleting(false)}>
          <h2>Are you sure you want to delete this event?</h2>
          <p>This action cannot be undone.</p>
          {isDeletePending && <p>Deleting please wait...</p>}
          {!isDeletePending && (
            <div className="form-actions">
              <button
                onClick={() => setIsDeleting(false)}
                className="button-text"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  mutate({ id: eventId });
                  setIsDeleting(false);
                }}
                className="button"
              >
                Yes, Delete
              </button>
            </div>
          )}
          {isDeleteError && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deleteError.info?.message ||
                "Failed to delete event. Please try again later."
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
    </>
  );
}
