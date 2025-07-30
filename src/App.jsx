import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Browse from "./pages/Browse/Browse";

export default function App() {
  return (
    <div className="container">
      <Navbar />

      <Browse/>
    </div>
  );
}
