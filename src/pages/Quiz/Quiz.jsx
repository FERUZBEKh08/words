import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../App.css";
import "./Quiz.css";

export default function Quiz({ words }) {
  const getInitialLevel = () => localStorage.getItem("selectedLevel") || "Beginner";
  const getInitialIndex = () => parseInt(localStorage.getItem("currentIndex") || 0, 10);
  const getInitialInputVal = () => localStorage.getItem("inputVal") || "";
  const getInitialCheckAnswer = () => localStorage.getItem("checkAnswer") || "";
  const getInitialHow = () => localStorage.getItem("how") === "true";
  const getInitialSeeHow = () => localStorage.getItem("seeHow") === "true";
  const getInitialShow = () => localStorage.getItem("show") === "true";

  const [selectedLevel, setSelectedLevel] = useState(getInitialLevel);
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [inputVal, setInputVal] = useState(getInitialInputVal);
  const [checkAnswer, setCheckAnswer] = useState(getInitialCheckAnswer);
  const [how, setHow] = useState(getInitialHow);
  const [seeHow, setSeeHow] = useState(getInitialSeeHow);
  const [show, setShow] = useState(getInitialShow);

  const filteredWords = words.filter(
    (word) => word.level.toLowerCase() === selectedLevel.toLowerCase()
  );

  const currentWord = filteredWords[currentIndex];

  useEffect(() => localStorage.setItem("selectedLevel", selectedLevel), [selectedLevel]);
  useEffect(() => localStorage.setItem("currentIndex", currentIndex), [currentIndex]);
  useEffect(() => localStorage.setItem("inputVal", inputVal), [inputVal]);
  useEffect(() => localStorage.setItem("checkAnswer", checkAnswer), [checkAnswer]);
  useEffect(() => localStorage.setItem("how", how), [how]);
  useEffect(() => localStorage.setItem("seeHow", seeHow), [seeHow]);
  useEffect(() => localStorage.setItem("show", show), [show]);

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputVal("");
      setCheckAnswer("");
      setHow(false);
      setSeeHow(false);
      setShow(false);
    }
  };

  const handleShow = () => setShow(!show);

  const handleCheck = () => {
    if (inputVal.length > 0) {
      const check = currentWord.uzbek
        .toLowerCase()
        .replace("-", "")
        .replace("o‘", "o'")
        .replace("(", "")
        .replace(")", "")
        .trim()
        .includes(inputVal.toLowerCase().trim());

      setSeeHow(true);
      setCheckAnswer(check ? "To‘g‘ri" : "Xato");
      setHow(check);
    }
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setInputVal("");
    setCheckAnswer("");
    setHow(false);
    setSeeHow(false);
    setShow(false);
  };

  return (
    <div className="quiz">
      <div className="quiz-top">
        {["Beginner", "Elementary", "Intermediate", "Advanced"].map((lvl) => (
          <button
            key={lvl}
            className={lvl === selectedLevel ? "active-level" : ""}
            onClick={() => handleLevelSelect(lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="quiz-bottom">
        {currentWord ? (
          <>
            <h2 className="quiz-english">{currentWord.english}</h2>
            <input
              type="text"
              placeholder="write answer"
              className="quiz-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            {show && <p className="quiz-uzbek">{currentWord.uzbek}</p>}
            {seeHow && (
              <p className={how ? "quiz-correct" : "quiz-incorrect"}>
                {checkAnswer}
              </p>
            )}
            <button className="quiz-btn" onClick={handleShow}>
              {!show ? `Javobni ko‘rsatish` : `Javobni yashirish`}
            </button>
            <button className="quiz-btn" onClick={handleNext}>Next</button>
            <button className="quiz-btn" onClick={handleCheck}>Tekshirish</button>
          </>
        ) : (
          <p>Daraja tanlang !!</p>
        )}
      </div>
    </div>
  );
}

Quiz.propTypes = {
  words: PropTypes.array.isRequired,
};
