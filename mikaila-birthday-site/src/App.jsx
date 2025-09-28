import { useEffect, useState } from "react";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Slider from "./components/Slider/Slider";
import "./screens.css"; // ⬅️ new stylesheet below

const App = () => {
  const heroData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give into", text2: "your passions" },
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroCount((c) => (c === 2 ? 0 : c + 1));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Optional: lock body scroll while on slider screen
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = showSlider ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev; };
  }, [showSlider]);

  return (
    <div>
      {/* Birthday screen */}
      {!showSlider && (
        <div className="screen birthday-screen" aria-hidden={showSlider}>
          <Background playStatus={playStatus} heroCount={heroCount} />
          <Navbar />
          <Hero
            setPlayStatus={setPlayStatus}
            heroData={heroData[heroCount]}
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            playStatus={playStatus}
          />
        </div>
      )}

      {/* Full-screen slider screen */}
      {showSlider && (
        <div className="screen slider-screen" role="region" aria-label="Gift selection">
          <Slider />
        </div>
      )}

      {/* Fixed toggle button (same spot in both states) */}
      <div className="dock">
        <button
          type="button"
          className="cta"
          onClick={() => setShowSlider((s) => !s)}
          aria-expanded={showSlider}
        >
          {showSlider ? "Go back to birthday screen" : "Select your gift here"}
        </button>
      </div>
    </div>
  );
};

export default App;
