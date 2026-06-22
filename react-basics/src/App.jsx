import React, { Suspense } from "react";
import "./App.css";
import {
  JSX_React,
  Props_React,
  RenderProps,
  ListRendering_React,
  HOC_React,
  ContextAPI_React,
  ConditionalRendering_React,
  Components_React,
  ComponentArchitecture_React,
  EventHandling_React,
  ErrorBoundary_React,
  LazyLoading_React,
  Routing_React,
  Forms_React,
  FormHooks_React,
  MultiStepForm,
  DynamicForm,
} from "./pages";

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

      <Suspense fallback={<div className="page-loader">Loading...</div>}>
        {renderPage()}
      </Suspense>
    </>
  );
}

export default App;
