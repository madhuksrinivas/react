import React, { Component } from "react";
import "./App.css";

// Basics
import Greet from "./components/01-Basics/Greet";
import Hello from "./components/01-Basics/Hello";
import Welcome from "./components/01-Basics/Welcome";
import Form from "./components/01-Basics/Form";

// Props
import DestructFunComp from "./components/02-Props/DestructFunComp";
import DestructClassComp from "./components/02-Props/DestructClassComp";

// State
import Message from "./components/03-State/Message";
import Counter from "./components/03-State/Counter";
import Count from "./components/03-State/Count";

// Events
import FuncionClick from "./components/04-Events/FuncionClick";
import ClassClick from "./components/04-Events/ClassClick";
import EventBind from "./components/04-Events/EventBind";
import ParentComponet from "./components/04-Events/ParentComponet";

// Conditional & List Rendering
import ConditionalRendering from "./components/05-Conditional-List/ConditionalRendering";
import ListRendering from "./components/05-Conditional-List/ListRendering";

// Styling
import StyleSheet from "./components/06-Styling/StyleSheet";
import InlineCss from "./components/06-Styling/InlineCss";
import "./moduleCss/appStyle.css";
import styles from "./moduleCss/appStyle.module.css";

// Lifecycle
import LifeCycleA from "./components/07-Lifecycle/LifeCycleA";

// Fragments
import FragmentDemo from "./components/08-Fragments/FragmentDemo";
import Table from "./components/08-Fragments/Table";

// Pure & Memo Components
import ParentComp from "./components/09-PureComponents/ParentComp";

// Refs
import RefsDemo from "./components/10-Refs/RefsDemo";
import FocusInput from "./components/10-Refs/FocusInput";
import ForwardRefParentInput from "./components/10-Refs/ForwardRefParentInput";

// Portals
import PortalDemo from "./components/11-Portals/PortalDemo";

// Error Boundary
import Hero from "./components/12-ErrorBoundary/Hero";
import ErrorBoundary from "./components/12-ErrorBoundary/ErrorBoundary";

// Higher Order Components
import ClickCounter from "./components/13-HigherOrderComponents/ClickCounter";
import HoverCounter from "./components/13-HigherOrderComponents/HoverCounter";

// Render Props
import ClickCounterRP from "./components/14-RenderProps/ClickCounterRP";
import HoverCounterRP from "./components/14-RenderProps/HoverCounterRP";
import User from "./components/14-RenderProps/User";
import CounterRP from "./components/14-RenderProps/CounterRP";

// Context API
import ComponentC from "./components/15-Context/ComponentC";
import { UserProvider } from "./components/15-Context/UserContext";

// HTTP Requests
import PostList from "./components/16-HTTP/PostList";
import PostForm from "./components/16-HTTP/PostForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Class Components Learning Project</h1>

        {/* ========== 01. BASICS ========== */}
        {/* JSX vs createElement */}
        <Hello />
        {/* Functional & Class Components */}
        {/* <Greet name="Naruto" surname="Uzumaki">
          <p>This is children props</p>
        </Greet>
        <Greet name="Sasuke" surname="Uchiha">
          <button>Action</button>
        </Greet> */}

        {/* <Welcome name="Hinata" surname="Hyuga" />
        <Welcome name="Sakura" surname="Haruno" /> */}

        {/* Form Handling */}
        {/* <Form /> */}

        {/* ========== 02. PROPS ========== */}
        {/* Props Destructuring */}
        {/* <DestructFunComp name="Minato" surname="Namikaze" />
        <DestructClassComp name="Kushina" surname="Uzumaki" /> */}

        {/* ========== 03. STATE ========== */}
        {/* State Management */}
        {/* <Message /> */}
        {/* <Counter addValue="1" /> */}
        {/* <Count /> */}

        {/* ========== 04. EVENTS ========== */}
        {/* Event Handling */}
        {/* <FuncionClick />
        <ClassClick /> */}

        {/* Event Binding */}
        {/* <EventBind /> */}

        {/* Parent-Child Communication */}
        {/* <ParentComponet /> */}

        {/* ========== 05. CONDITIONAL & LIST RENDERING ========== */}
        {/* Conditional Rendering */}
        {/* <ConditionalRendering /> */}

        {/* List Rendering */}
        {/* <ListRendering /> */}

        {/* ========== 06. STYLING ========== */}
        {/* CSS Stylesheets */}
        {/* <StyleSheet secondary={true} /> */}

        {/* Inline CSS */}
        {/* <InlineCss /> */}

        {/* CSS Modules */}
        {/* <h1 className="error">Error</h1>
        <h1 className={styles.success}>Success</h1> */}

        {/* ========== 07. LIFECYCLE ========== */}
        {/* Component Lifecycle Methods */}
        {/* <LifeCycleA /> */}

        {/* ========== 08. FRAGMENTS ========== */}
        {/* React Fragments */}
        {/* <FragmentDemo /> */}
        {/* <Table /> */}

        {/* ========== 09. PURE COMPONENTS ========== */}
        {/* Pure Component Optimization */}
        {/* <ParentComp /> */}

        {/* ========== 10. REFS ========== */}
        {/* Refs - Direct DOM Access */}
        {/* <RefsDemo /> */}
        {/* <FocusInput /> */}

        {/* Forward Refs */}
        {/* <ForwardRefParentInput /> */}

        {/* ========== 11. PORTALS ========== */}
        {/* React Portals */}
        {/* <PortalDemo /> */}

        {/* ========== 12. ERROR BOUNDARY ========== */}
        {/* Error Handling */}
        {/* <ErrorBoundary>
          <Hero heroname="Batman" />
        </ErrorBoundary>
        <ErrorBoundary>
          <Hero heroname="Superman" />
        </ErrorBoundary>
        <ErrorBoundary>
          <Hero heroname="Joker" />
        </ErrorBoundary> */}

        {/* ========== 13. HIGHER ORDER COMPONENTS (HOC) ========== */}
        {/* HOC Pattern */}
        {/* <ClickCounter name="Mr.Click" />
        <HoverCounter name="Mr.Hover" /> */}

        {/* ========== 14. RENDER PROPS ========== */}
        {/* Render Props Pattern */}
        {/* <User render={(isLoggedIn) => (isLoggedIn ? "PervySage" : "Guest")} />
        <CounterRP
          render={(count, incrementCount) => (
            <ClickCounterRP count={count} incrementCount={incrementCount} />
          )}
        />
        <CounterRP
          render={(count, incrementCount) => (
            <HoverCounterRP count={count} incrementCount={incrementCount} />
          )}
        /> */}

        {/* ========== 15. CONTEXT API ========== */}
        {/* Context for Global State */}
        {/* <UserProvider value="Vishwas">
          <ComponentC />
        </UserProvider> */}

        {/* ========== 16. HTTP REQUESTS ========== */}
        {/* HTTP with Axios */}
        {/* <PostList />
        <PostForm /> */}
      </div>
    );
  }
}

export default App;
