import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search/Search";
import Info from "./pages/Info/Info";
import Quiz from "./pages/Quiz/Quiz";
import Likes from "./pages/Likes/Likes";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    if (inputValue !== "") {
      localStorage.setItem("getLocal", inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    const getLocal = localStorage.getItem("getLocal");
    if (getLocal !== null) setInputValue(getLocal);
  }, []);

  const handleAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://alnkjqfwdwdngfnehzdm.supabase.co/storage/v1/object/public/words//words.json");
        const data = await res.json();
        setWords(data);
      } catch (err) {
        console.error("Xatolik", err);
      }
    };
    getData();
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Search
                inputValue={inputValue}
                setInputValue={setInputValue}
                words={words}
                handleAudio={handleAudio}
                filteredWords={filteredWords}
                setFilteredWords={setFilteredWords}
              />
            }
          />

          <Route path="/quiz" element={<Quiz words={words} />} />

          <Route path="/likes" element={<Likes />} />

          <Route path="info" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
