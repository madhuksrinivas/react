import React from "react";
import "./App.css";
import JSX_React from "./jsx/JSX_React";
import Props_React from "./props/Props_React";
import RenderProps from "./renderprops/RenderProps";
import ListRendering_React from "./list-rendering/ListRendering";
import HOC_React from "./hoc/HOC_React";
import ContextAPI_React from "./context-api/ContextAPI_React";
import ConditionalRendering_React from "./conditional-rendering/ConditionalRendering_React";
import Components_React from "./components/Components_React";
import ComponentArchitecture_React from "./component-architecture/ComponentArchitecture_React";
import EventHandling_React from "./event-handling/EventHandling_React";
import ErrorBoundary_React from "./error-boundary/ErrorBoundary_React";
import LazyLoading_React from "./lazyloading-suspense/LazyLoading_React";
import Routing_React from "./routing/Routing_React";
import Forms_React from "./forms/Forms_React";
import FormHooks_React from "./hooks/form-hooks/FormHooks_React";
import MultiStepForm from "./forms/multi-step-form/MultiStepForm";
import DynamicForm from "./forms/dynamicform/DynamicForm";

const PAGE_LABELS = [
  "JSX & React Basics",
  "Props",
  "Render Props",
  "List Rendering",
  "Higher-Order Components",
  "Context API + useReducer",
  "Conditional Rendering",
  "Controlled vs Uncontrolled",
  "Component Architecture",
  "Event Handling",
  "Error Boundary",
  "Lazy Loading & Suspense",
  "Routing",
  "Forms",
  "Form Hooks",
  "Multi-Step Form",
  "Dynamic Form",
];

function App() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleNextPage = () => {
    if (currentPage < 17) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <JSX_React />;
      case 2:
        return <Props_React />;
      case 3:
        return <RenderProps />;
      case 4:
        return <ListRendering_React />;
      case 5:
        return <HOC_React />;
      case 6:
        return <ContextAPI_React />;
      case 7:
        return <ConditionalRendering_React />;
      case 8:
        return <Components_React />;
      case 9:
        return <ComponentArchitecture_React />;
      case 10:
        return <EventHandling_React />;
      case 11:
        return <ErrorBoundary_React />;
      case 12:
        return <LazyLoading_React />;
      case 13:
        return <Routing_React />;
      case 14:
        return <Forms_React />;
      case 15:
        return <FormHooks_React />;
      case 16:
        return <MultiStepForm />;
      case 17:
        return <DynamicForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="app-header">
        <h1>React Basics</h1>
        <div className="header-page-info">
          <span>{PAGE_LABELS[currentPage - 1]}</span>
          <span className="header-page-label">Topic {currentPage} of 17</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="nav-btn nav-btn-dark"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <button
            className="nav-btn nav-btn-dark"
            onClick={handleNextPage}
            disabled={currentPage === 17}
          >
            Next →
          </button>
        </div>
      </header>

      {renderPage()}

      {/* <footer className="app-footer">
        <button
          className="nav-btn nav-btn-light"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
        <span className="footer-page-counter">
          {currentPage} / 17 — {PAGE_LABELS[currentPage - 1]}
        </span>
        <button
          className="nav-btn nav-btn-light"
          onClick={handleNextPage}
          disabled={currentPage === 17}
        >
          Next →
        </button>
      </footer> */}
    </>
  );
}

export default App;
