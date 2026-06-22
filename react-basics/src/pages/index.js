import { lazy } from "react";

export const JSX_React = lazy(() => import("../jsx/JSX_React"));
export const Props_React = lazy(() => import("../props/Props_React.jsx"));
export const RenderProps = lazy(() => import("../renderprops/RenderProps"));
export const ListRendering_React = lazy(
  () => import("../list-rendering/ListRendering"),
);
export const HOC_React = lazy(() => import("../hoc/HOC_React"));
export const ContextAPI_React = lazy(
  () => import("../context-api/ContextAPI_React"),
);
export const ConditionalRendering_React = lazy(
  () => import("../conditional-rendering/ConditionalRendering_React"),
);
export const Components_React = lazy(
  () => import("../components/Components_React"),
);
export const ComponentArchitecture_React = lazy(
  () => import("../component-architecture/ComponentArchitecture_React"),
);
export const EventHandling_React = lazy(
  () => import("../event-handling/EventHandling_React"),
);
export const ErrorBoundary_React = lazy(
  () => import("../error-boundary/ErrorBoundary_React"),
);
export const LazyLoading_React = lazy(
  () => import("../lazyloading-suspense/LazyLoading_React"),
);
export const Routing_React = lazy(() => import("../routing/Routing_React"));
export const Forms_React = lazy(() => import("../forms/Forms_React"));
export const FormHooks_React = lazy(
  () => import("../hooks/form-hooks/FormHooks_React"),
);
export const MultiStepForm = lazy(
  () => import("../forms/multi-step-form/MultiStepForm"),
);
export const DynamicForm = lazy(
  () => import("../forms/dynamicform/DynamicForm"),
);
