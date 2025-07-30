import "../../App.css";
import "./Navbar.css";

import logoLight from "../../assets/logo light.png";

import Browse from "../../assets/icons/folder.png";
import Study from "../../assets/icons/book.png";
import Quiz from "../../assets/icons/brain.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__in">
        <img className="navbar-logo" src={logoLight} alt="" />
        <ul>
          <li>
            <img src={Browse} alt="" />
            Browse
          </li>
          <li>
            <img src={Study} alt="" />
            Study
          </li>
          <li>
            <img src={Quiz} alt="" />
            Quiz
          </li>
        </ul>
      </div>
    </nav>
  );
}
