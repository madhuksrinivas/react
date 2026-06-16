import React, { useEffect } from "react";
import { useFetchNotesQuery } from "../hooks/useFetchNotesQuery";
import toast from "react-hot-toast";
import Notes from "../components/Notes";

function HomePage() {
  const { isLoading, isError, data, error } = useFetchNotesQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch notes", {
        id: "fetch-notes-error",
      });
    }
  }, [isError, error]);

  return (
    <div className="home-page">
      {isLoading && (
        <div className="loading-state">
          <p className="loading-text">Loading notes...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
      {!isLoading && !isError && <Notes notesData={data} />}
    </div>
  );
}

export default HomePage;
