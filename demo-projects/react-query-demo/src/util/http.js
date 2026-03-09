const API_URL = "http://localhost:3000/events";
export async function fetchEvents({ signal, searchTerm }) {
  let url = API_URL;
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function fetchEventById({ signal, eventId }) {
  let url = API_URL;
  if (eventId) {
    url += `/${encodeURIComponent(eventId)}`;
  }
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return await response.json();
}

export async function deleteEvent({ id }) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return await response.json();
}

export async function createNewEvent(eventData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event: eventData }), // converts object → JSON text string
  });
  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`${API_URL}/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();
  return images;
}

export const deleteEventById = async ({ id }) => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return response.json();
};

export const editEventById = async ({ id, eventData }) => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event: eventData }),
  });
  if (!response.ok) {
    const error = new Error("An error occurred while editing the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return response.json();
};
