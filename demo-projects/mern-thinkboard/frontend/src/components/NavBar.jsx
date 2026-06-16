import { Link } from "react-router";
import { PlusIcon, ArrowLeft } from "lucide-react";
import "../styles/navbar.css";
import thinkBoardIcon from "../assets/logo/think-board-icon.png";

const NavBar = ({ activePage }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-content">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img
              src={thinkBoardIcon}
              alt="Think Board Icon"
              className="navbar-icon"
              style={{ width: "40px", height: "40px" }}
            />
            <Link
              to="/"
              className={`navbar-title-link ${activePage === "home" ? "active" : ""}`}
            >
              <h1 className="navbar-title">Think Board</h1>
            </Link>
          </div>
          <div className="navbar-create-wrap">
            {activePage !== "create" && activePage !== "editNote" ? (
              <Link
                to="/create"
                className={`navbar-create-link ${activePage === "create" ? "active" : ""}`}
              >
                <PlusIcon className="navbar-create-icon" />
                Create Note
              </Link>
            ) : (
              <Link
                to="/"
                className={`navbar-create-link ${activePage === "create" || activePage === "editNote" ? "active" : ""}`}
              >
                <ArrowLeft className="navbar-create-icon" />
                Back
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
