import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/HomePage";
import { RQSuperHeroesPage } from "./components/RQSuperHeroesPage";
import { SuperHeroesPage } from "./components/SuperHeroesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RQSuperHeroePage from "./components/RQSuperHeroPage";
import RQParallelQueriesPage from "./components/RQParallelQueriesPage";
import RQDynamicParallelQueriesPage from "./components/RQDynamicParallelQueries";
import RQDependentQueriesPage from "./components/RQDependentQueriesPage";
import RQPaginationQueriesPage from "./components/RQPaginationQueriesPage";
import RQInfiniteQueriesPage from "./components/RQInfiniteQueriesPage";
import RQMutations from "./components/RQMutations";

const queryClient = new QueryClient();

const linkTo = [
  { to: "/", label: "Home" },
  { to: "/super-heroes", label: "Traditional Super Heroes" },
  { to: "/rq-super-heroes", label: "RQ Super Heroes" },
  { to: "/rq-parallel-queries", label: "RQ Parallel Queries" },
  { to: "/rq-dynamic-parallel-queries", label: "RQ Dynamic Parallel Queries" },
  { to: "/rq-dependent-queries", label: "RQ Dependent Queries" },
  { to: "/pagination-queries", label: "Pagination Queries" },
  { to: "/infinite-queries", label: "Infinite Queries" },
  { to: "/rq-mutations", label: "RQ Mutations" },
];

const routeTo = [
  { path: "/", element: <HomePage /> },
  { path: "/super-heroes", element: <SuperHeroesPage /> },
  { path: "/rq-super-heroes", element: <RQSuperHeroesPage /> },
  { path: "/rq-super-heroes/:heroId", element: <RQSuperHeroePage /> },
  { path: "/rq-parallel-queries", element: <RQParallelQueriesPage /> },
  {
    path: "/rq-dynamic-parallel-queries",
    element: <RQDynamicParallelQueriesPage heroIds={[1, 4]} />,
  },
  {
    path: "/rq-dependent-queries",
    element: <RQDependentQueriesPage emailId="madhu@example.com" />,
  },
  {
    path: "/pagination-queries",
    element: <RQPaginationQueriesPage />,
  },
  {
    path: "/infinite-queries",
    element: <RQInfiniteQueriesPage />,
  },
  {
    path: "/rq-mutations",
    element: <RQMutations />,
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <div>
          <nav>
            <ul>
              {linkTo.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <Routes>
            {routeTo.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
