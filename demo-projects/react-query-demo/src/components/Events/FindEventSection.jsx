import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http.js";
import { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";

// React Query creates and provides the signal
// Your function accepts and forwards it to fetch()
// Browser's fetch() API uses it to cancel requests
// The signal parameter is an AbortSignal object that React Query automatically provides to enable request cancellation.
// Purpose:
// The signal allows React Query to cancel in-flight HTTP requests when:
// Component unmounts - User navigates away before data loads
// Query becomes inactive - Component is removed from the DOM
// New request starts - User triggers a new search before the previous one completes
// Manual cancellation - You explicitly cancel the query

export default function FindEventSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchElement = useRef();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", searchTerm],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm: searchTerm }),
    enabled: searchTerm !== "", // ✅ Only run when searchTerm exists
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (searchTerm) {
    if (isLoading) {
      content = <LoadingIndicator />;
    } else if (error) {
      content = (
        <ErrorBlock
          title="An error occurred"
          message={error?.info?.message || "Failed to fetch events"}
        />
      );
    } else if (data && data.length === 0) {
      content = <p>No events found for "{searchTerm}".</p>;
    } else if (data && data.length > 0) {
      content = (
        <ul className="events-list">
          {data.map((event) => (
            <li key={event.id}>
              <EventItem event={event} />
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
