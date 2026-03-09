import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http.js";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";

export default function NewEventsSection() {
  const {
    isLoading,
    error,
    data: newEventsData,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    // staleTime: 1000 * 60, // 1 minute - this timeout is for considering data fresh
    // cacheTime: 1000 * 60 * 5, // 5 minutes - this timeout is for keeping cache in memory
    // gcTimeut: 1000 * 60 * 10, // 10 minutes - this timeout is for garbage collection of unused cache
    refetchOnWindowFocus: true,
  });
  console.log("NewEventsSection render");
  console.log("newEventsData:", newEventsData);

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error?.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (newEventsData && newEventsData.length === 0) {
    content = <p>No events found.</p>;
  }

  if (newEventsData && newEventsData.length > 0) {
    content = (
      <ul className="events-list">
        {newEventsData.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
