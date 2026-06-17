import { useState, useEffect, useMemo } from "react";
import { useFetchNotesQuery } from "../hooks/useFetchNotesQuery";
import toast from "react-hot-toast";
import Notes from "../components/Notes";

function toLocalYMD(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

const TODAYS_DATE = new Date().toISOString().split("T")[0];
function HomePage() {
  const { isLoading, isError, data, error } = useFetchNotesQuery();
  const [selectedDate, setSelectedDate] = useState(TODAYS_DATE);
  const [includeAll, setIncludeAll] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch notes", {
        id: "fetch-notes-error",
      });
    }
  }, [isError, error]);

  const filteredNotes = useMemo(() => {
    if (selectedDate === "") {
      return data;
    }
    return data?.filter((note) => toLocalYMD(note.createdAt) === selectedDate);
  }, [data, selectedDate]);

  const includeAllNotesHandler = () => {
    setIncludeAll((prev) => !prev);
    selectedDate === "" ? setSelectedDate(TODAYS_DATE) : setSelectedDate("");
  };

  return (
    <div className="home-page">
      {isLoading && (
        <div className="loading-state">
          <p className="loading-text">Loading notes...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="filter-container">
          <p className="filter-meta">
            Showing {filteredNotes?.length} of {data?.length} notes
          </p>
          <div className="filter-wrap">
            <label htmlFor="note-date-filter" className="filter-label">
              Filter by date
            </label>
            <input
              id="note-date-filter"
              type="date"
              className="filter-date-input"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setIncludeAll(false);
              }}
            />
            <button
              type="button"
              className={`include-all-btn ${includeAll ? "active" : ""}`}
              onClick={includeAllNotesHandler}
            >
              {includeAll ? "Show Notes for Today" : "Show All Notes"}
            </button>
          </div>
        </div>
      )}
      {!isLoading && !isError && <Notes notesData={filteredNotes} />}
    </div>
  );
}

export default HomePage;