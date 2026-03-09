import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./navigation/Home";
import About from "./navigation/About";
import Contact from "./navigation/Contact";
import Users from "./routes/Users";
import UserDetail from "./params/UserDetail";
import Dashboard from "./nested-routes/Dashboard";
import DashboardProfile from "./nested-routes/DashboardProfile";
import DashboardSettings from "./nested-routes/DashboardSettings";
import DashboardAnalytics from "./nested-routes/DashboardAnalytics";
import NotFound from "./routes/NotFound";

function Routing_React() {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/users", label: "Users" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/users", element: <Users /> },
    { path: "/users/:id", element: <UserDetail /> },
  ];

  const dashboardRoutes = [
    { path: "profile", element: <DashboardProfile /> },
    { path: "settings", element: <DashboardSettings /> },
    { path: "analytics", element: <DashboardAnalytics /> },
  ];

  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Navigation Bar */}
        <nav
          style={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ccc",
          }}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                marginRight: index < navLinks.length - 1 ? "15px" : "0",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Routes */}
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* Nested Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            {dashboardRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routing_React;
