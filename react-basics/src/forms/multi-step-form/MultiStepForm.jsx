import { useState, memo } from "react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import ReviewAndSubmit from "./ReviewAndSubmit";

function MultiStepForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });

  const handleInputChange = (e, field) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };
  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    setCurrentPage(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      comments: "",
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <FormStep1
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <FormStep2
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ReviewAndSubmit formData={formData} handleSubmit={handleSubmit} />
        );
      default:
        return null;
    }
  };

  const btnBase = {
    padding: "13px 32px",
    borderRadius: "8px",
    fontFamily: "inherit",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        fontFamily: "system-ui, Arial, sans-serif",
        color: "#1f2937",
      }}
    >
      <h2 style={{ margin: "0 0 28px", fontSize: "26px", fontWeight: 700 }}>
        Multi-Page Form
      </h2>
      {renderPage()}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "24px",
        }}
      >
        <button
          onClick={handlePreviousPage}
          style={{
            ...btnBase,
            background: "#ffffff",
            border: "1px solid #d1d5db",
            color: "#374151",
            visibility: currentPage === 1 ? "hidden" : "visible",
          }}
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          style={{
            ...btnBase,
            background: "#2563eb",
            border: "none",
            color: "#ffffff",
            visibility: currentPage === 3 ? "hidden" : "visible",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default memo(MultiStepForm);
