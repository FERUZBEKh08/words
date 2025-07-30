import { useState } from "react";
import "../../App.css";
import "./Browse.css";

import Volume from "../../assets/icons/volume.png";

export default function Browse() {
  const [words, setWords] = useState([]);

  async function getData() {
    try {
      const response = await fetch("../../data/words.json");

      if (!response.ok) {
        console.log("Tarmoq xatosi");
      }
      const data = await response.json();
      setWords(data);
    } catch (error) {
      console.error("Xatolik ", error);
    }
  }

  getData();

  const handleAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  //   const handleAudioUz = (textuz) => {
  //     const utterance = new SpeechSynthesisUtterance(textuz)
  //     utterance.lang = "uz-UZ"
  //     window,speechSynthesis(utterance)
  //   }

  return (
    <div className="browse">
      {words.map((word) => (
        <div key={word.id} className="browse__box">
          <span className="box-englishAudio">
            <p className="englishAudio-english word">{word.english}</p>
            <button
              className="audioBtn"
              onClick={() => handleAudio(word.english)}
            >
              <img src={Volume} alt="" />
            </button>
          </span>
          <p className="box-uzbek word">{word.uzbek}</p>
          <span className="box-info">
            <span>{word.category}</span>
            <span>{word.partOfSpeech}</span>
            <span>{word.difficulty}</span>
          </span>

          <article className="setences">
            <span className="sentences-boxEng">
              <p className="boxEng-sentenceEn box-sentence">
                <span>&#34;</span>
                {word.example}
                <span>&#34;</span>
              </p>
              <button className="audioBtn" onClick={() => handleAudio(word.example)}>
                <img src={Volume} alt="" />
              </button>
            </span>
            <span>
              <p className="box-sentenceUz box-sentence">
                <span>&#34;</span>
                {word.exampleUzbek}
                <span>&#34;</span>
              </p>
            </span>
          </article>
        </div>
      ))}
    </div>
  );
}
