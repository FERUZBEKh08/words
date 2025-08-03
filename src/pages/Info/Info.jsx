import "../../App.css";
import "./Info.css";

export default function Info() {
  return (
    <div className="info">
      <article className="info-top">
        <p className="top-title">Description 👇</p>

        <p className="top-description">
          Learn English faster with this structured English-Uzbek vocabulary
          app! This site provides over <span>1000</span> essential English words
          along with their Uzbek translations, examples, and categories — all
          divided into CEFR-based levels:
        </p>

        <p className="top-title">Each word includes 👇</p>

        <ul className="top-info">
          <li>1. English and Uzbek translation</li>
          <li>2. Part of speech and category (e.g., Food, Home, Work)</li>
          <li>3. Example sentences in both languages</li>
          <li>4. Vocabulary level</li>
          <li>5. Pronunciation</li>
        </ul>

        <p className="top-title">How many words 👇</p>

        <ul className="top-words">
          <li className="words-all">🟢 All 1000 🔴</li>
          <span>
            <li>🟢 Beginner – 350 words</li>
            <li>🔵 Elementary – 350 words</li>
            <li>🟠 Intermediate – 250 words</li>
            <li>🔴 Advanced – 50 words</li>
          </span>
        </ul>
      </article>
    </div>
  );
}
