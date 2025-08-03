import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../App.css";
import "./Search.scss";
import { FaVolumeUp } from "react-icons/fa";

export default function Search({
  words,
  handleAudio,
  inputValue,
  setInputValue,
  filteredWords,
  setFilteredWords,
}) {
  const getInitialLiValue = () => localStorage.getItem("liValue") || "ShowAll";

  const [liValue, setLiValue] = useState(getInitialLiValue);

  const toggleLike = (word) => {
    const existing = JSON.parse(localStorage.getItem("likedWords")) || [];
    const isAlreadyLiked = existing.find((w) => w.id === word.id);

    let updatedLikes;
    if (isAlreadyLiked) {
      updatedLikes = existing.filter((w) => w.id !== word.id);
    } else {
      updatedLikes = [...existing, word];
    }

    localStorage.setItem("likedWords", JSON.stringify(updatedLikes));
  };

  useEffect(() => {
    const savedInput = localStorage.getItem("inputValue") ?? "";
    (savedInput);

    const savedLiValue = localStorage.getItem("liValue") || "ShowAll";
    setLiValue(savedLiValue);

    filterWords(savedInput, savedLiValue);
  }, [words]);

  useEffect(() => {
    filterWords(inputValue, liValue);
  }, [inputValue, liValue]);

  useEffect(() => {
    localStorage.setItem("inputValue", inputValue);
  }, [inputValue]);

  useEffect(() => {
    localStorage.setItem("liValue", liValue);
  }, [liValue]);

  const filterWords = (searchText, level) => {
    let filtered = words;

    if (level !== "ShowAll") {
      filtered = filtered.filter(
        (word) => word.level.toLowerCase() === level.toLowerCase()
      );
    }

    if (searchText.trim() !== "") {
      filtered = filtered.filter((word) =>
        word.english.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredWords(filtered);
    localStorage.setItem("filteredWords", JSON.stringify(filtered));
  };

  return (
    <div className="search">
      <article className="search-top">
        <input
          className="top-input"
          type="text"
          placeholder="So'z qidirish / Search words..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="levelBtn">
          Levels
          <ul className="levels">
            {[
              "ShowAll",
              "Beginner",
              "Elementary",
              "Intermediate",
              "Advanced",
            ].map((lvl) => (
              <li
                key={lvl}
                className={liValue === lvl ? "active-level" : ""}
                onClick={() => {
                  setLiValue(lvl);
                  setInputValue("");
                  localStorage.removeItem("inputValue");
                }}
              >
                {lvl}
              </li>
            ))}
          </ul>
        </button>
      </article>

      <div className="search-bottom">
        {filteredWords.length > 0 ? (
          filteredWords.map((e, i) => (
            <div className="wordBox" key={i}>
              <span className="box-top">
                <span className="top-volume">
                  <p className="volume-en">{e.english}</p>
                  <button
                    className="volumeBtn"
                    onClick={() => handleAudio(e.english)}
                  >
                    <FaVolumeUp className="volumeIcon" />
                  </button>
                </span>
                <p className="box-uz">&#39;&#39;{e.uzbek}&#39;&#39;</p>
              </span>
              <span className="box-infos">
                <p className="infos-word">{e.category}</p>
                <p className="infos-word">{e.level}</p>
                <p className="infos-word">{e.partOfSpeech}</p>
              </span>
              <span className="box-examples">
                <span className="examples-top">
                  <h1 className="top-en">{e.exampleEn}</h1>
                  <button
                    className="volumeBtn"
                    onClick={() => handleAudio(e.exampleEn)}
                  >
                    <FaVolumeUp className="volumeIcon" />
                  </button>
                </span>
                <p className="examples-uz">&#39;&#39;{e.exampleUz}&#39;&#39;</p>
              </span>
              <button onClick={() => toggleLike(e)} className="addBtn">
                ❤️ Like
              </button>
            </div>
          ))
        ) : (
          <p className="undefined">
            {inputValue.trim().length > 0
              ? "Word not found !!!"
              : "Search for words !!!"}
          </p>
        )}
      </div>
    </div>
  );
}

Search.propTypes = {
  filteredWords: PropTypes.array.isRequired,
  setFilteredWords: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  words: PropTypes.array.isRequired,
  handleAudio: PropTypes.func.isRequired,
};
