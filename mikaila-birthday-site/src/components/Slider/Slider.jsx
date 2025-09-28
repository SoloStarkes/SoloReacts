import { useRef, useCallback } from "react";
import "./Slider.css";

// Data for each slide: name, background image, link, and description
const slides = [
  { 
    name: "Cafe Intermezzo (European Breakfast)", 
    img: "https://www.ajc.com/resizer/bghEsOMtoKm5UtVnPBjnkz2-FyY=/arc-anglerfish-arc2-prod-ajc/public/7PTEQPNCKXQ2MW4LR3MUKBXEMM.jpg", 
    link: "https://www.cafeintermezzo.com/",
    description: "Café Intermezzo brings the charm of a classic European coffeehouse to the U.S., offering guests a relaxing escape from the rush of daily life. With a menu featuring specialty coffees, exquisite pastries, and full meals from breakfast through late-night appetizers, this could be the spot you hit up after a rough and long all nighter!(Please don't pull all nighters 💀)" 
  },
  { 
    name: "Sun in my Belly (Brunch)",      
    img: "https://creativeloafing.com/dl31234?display&x=800&y=598", 
    link: "https://www.suninmybelly.com/",
    description: "Sun in My Belly is a vibrant brunch spot known for its creative, seasonal menu that blends Southern comfort with Mediterranean influences. From hearty classics like shrimp and grits to lighter options such as fresh salads, yogurt parfaits, and avocado toast, it offers something for all the girlfriends during Saturday brunch!" 
  },
  { 
    name: "Kafenio Avondale (Greek Lunch)",      
    img: "https://static.wixstatic.com/media/5ee7bd_75e81bc904fe415387e03f97a13f4b12~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5ee7bd_75e81bc904fe415387e03f97a13f4b12~mv2.jpg", 
    link: "https://www.kafeniogreekdiner.com/",
    description: "Kafenio Avondale is a laid-back café serving Greek-inspired fare alongside classic American all-day breakfast favorites. You could enjoy everything from fresh gyros and hearty salads to wraps, coffee, and pastries, with beer and wine available to round out the menu. Its casual atmosphere makes it a great spot for both a quick bite and a relaxed meal, which let's be honest we could always go for!" 
  },
  { 
    name: "Paolino Italian Restaurant & Gelateria (Italian Dinner)",    
    img: "https://s3-media0.fl.yelpcdn.com/bphoto/uziiw11p4OWtKf15K-vqVg/l.jpg", 
    link: "https://www.paolinoitaliano.com/",
    description: "Paolino Italian Restaurant & Gelateria is a cozy spot offering authentic Italian cuisine made with fresh ingredients, with a specialty in their different types of pastas. Since I know you don't like pizza, I managed to find probably the only Italian place in the world that doesn't have that on their menu!" 
  },
];


export default function Slider() {
  const rootRef = useRef(null);
  const slideRef = useRef(null);

  const handleNext = useCallback(() => {
    const root = rootRef.current;
    const slide = slideRef.current;
    if (!root || !slide) return;
    const items = root.querySelectorAll(".item");
    if (items.length > 0) slide.appendChild(items[0]);
  }, []);

  const handlePrev = useCallback(() => {
    const root = rootRef.current;
    const slide = slideRef.current;
    if (!root || !slide) return;
    const items = root.querySelectorAll(".item");
    if (items.length > 0) slide.prepend(items[items.length - 1]);
  }, []);

  return (
    <div ref={rootRef} className="slider container">
      <div className="slide" ref={slideRef}>
        {slides.map((s, i) => (
          <div key={i} className="item" style={{ backgroundImage: `url(${s.img})` }}>
            <div className="content">
              <div className="name">{s.name}</div>
              <div className="des">{s.description}</div>
              <a className="see-more" href={s.link} target="_blank" rel="noopener noreferrer">
                See More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Order: prev • select-gift • next */}
      <div className="ui-dock">
        <button className="nav prev" aria-label="Previous" onClick={handlePrev}></button>
        <button className="select-gift">Select this one!</button>
        <button className="nav next" aria-label="Next" onClick={handleNext}></button>
      </div>
    </div>
  );
}
