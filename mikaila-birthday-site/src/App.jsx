import { useEffect, useState } from "react";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Slider from "./components/Slider/Slider"; // ⬅️ add this

const App = () => {
  const heroData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give into", text2: "your passions" },
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroCount((count) => (count === 2 ? 0 : count + 1));
    }, 3000);
    return () => clearInterval(id); // ✅ cleanup
  }, []);

  return (
    <div>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Navbar />
      <Hero
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />

      {/* Slider section */}
      <div style={{ display: "grid", placeItems: "center", padding: "48px 0" }}>
        <Slider />
      </div>
    </div>
  );
};

export default App;
