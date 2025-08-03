import "../../App.css";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaQuestionCircle, FaHeart, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  // Localdan active tabni o'qish
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Har safar path o'zgarsa localga yoz
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveTab(currentPath);
    localStorage.setItem("activeTab", currentPath);
  }, [location]);

  return (
    <div className="navbar">
      <article className="navbar-top">
        <p className="top-title">Premium English Vocabulary</p>
        <p className="top-description">Professional til o&#39;rganish platformasi</p>
      </article>

      <ul className="navbar-bottom">
        <li className={activeTab === "/" ? "active" : ""}>
          <Link to="/">
            <FaSearch className="icon" />
            Search
          </Link>
        </li>
        <li className={activeTab === "/quiz" ? "active" : ""}>
          <Link to="/quiz">
            <FaQuestionCircle className="icon" />
            Quiz
          </Link>
        </li>
        <li className={activeTab === "/likes" ? "active" : ""}>
          <Link to="/likes">
            <FaHeart className="icon" />
            Like
          </Link>
        </li>
        <li className={activeTab === "/info" ? "active" : ""}>
          <Link to="/info">
            <FaInfoCircle className="icon" />
            Info
          </Link>
        </li>
      </ul>
    </div>
  );
}
