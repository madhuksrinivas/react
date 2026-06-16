import { Routes, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import NavBar from "./components/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getActivePage } from "./utils/getActivePage";

const queryClient = new QueryClient();

const routePath = {
  home: "/",
  create: "/create",
  editNote: "/notes/:id/edit",
};

const routeElement = {
  home: <HomePage />,
  create: <CreatePage />,
  editNote: <EditPage />,
};

function App() {
  const { pathname } = useLocation();
  const activePage = getActivePage(pathname);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar activePage={activePage} />
        <Routes>
          {Object.keys(routePath).map((key) => (
            <Route
              key={key}
              path={routePath[key]}
              element={routeElement[key]}
            />
          ))}
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
