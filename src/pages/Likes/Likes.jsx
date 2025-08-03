import { useEffect, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

import "../../App.css";
import "./Likes.scss";

export default function Likes() {
  const [likedWords, setLikedWords] = useState([]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("likedWords")) || [];
    setLikedWords(liked);
  }, []);

  const handleAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const removeLike = (id) => {
    const updated = likedWords.filter((word) => word.id !== id);
    setLikedWords(updated);
    localStorage.setItem("likedWords", JSON.stringify(updated));
  };

  return (
    <div className="likes">
      <h2 className="likes-title">❤️ Liked Words</h2>
      {likedWords.length === 0 ? (
        <p className="likes-empty">No liked words yet.</p>
      ) : (
        likedWords.map((e, i) => (
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
            <button onClick={() => removeLike(e.id)} className="removeBtn">
              ❌ Remove from Likes
            </button>
          </div>
        ))
      )}
    </div>
  );
}
