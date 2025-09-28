import { useEffect, useRef } from "react";
import "./Slider.css";

// Data for each slide: name, background image, and external link
const slides = [
  {
    name: "Switzerland",
    img: "https://i.ibb.co/qCkd9jS/img1.jpg",
    link: "https://www.cafeintermezzo.com/",
  },
  {
    name: "Finland",
    img: "https://i.ibb.co/jrRb11q/img2.jpg",
    link: "https://www.visitfinland.com/",
  },
  {
    name: "Iceland",
    img: "https://i.ibb.co/NSwVv8D/img3.jpg",
    link: "https://visiticeland.com/",
  },
  {
    name: "Australia",
    img: "https://i.ibb.co/Bq4Q0M8/img4.jpg",
    link: "https://www.australia.com/",
  },
  {
    name: "Netherland",
    img: "https://i.ibb.co/jTQfmTq/img5.jpg",
    link: "https://www.holland.com/",
  },
  {
    name: "Ireland",
    img: "https://i.ibb.co/RNkk6L0/img6.jpg",
    link: "https://www.ireland.com/",
  },
];

export default function Slider() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const next = root.querySelector(".next");
    const prev = root.querySelector(".prev");
    const slide = root.querySelector(".slide");

    const handleNext = () => {
      const items = root.querySelectorAll(".item");
      if (items.length > 0) slide.appendChild(items[0]);
    };

    const handlePrev = () => {
      const items = root.querySelectorAll(".item");
      if (items.length > 0) slide.prepend(items[items.length - 1]);
    };

    next.addEventListener("click", handleNext);
    prev.addEventListener("click", handlePrev);

    return () => {
      next.removeEventListener("click", handleNext);
      prev.removeEventListener("click", handlePrev);
    };
  }, []);

  return (
    <div ref={rootRef} className="slider container">
      <div className="slide">
        {slides.map((s, i) => (
          <div
            key={i}
            className="item"
            style={{ backgroundImage: `url(${s.img})` }}
          >
            <div className="content">
              <div className="name">{s.name}</div>
              <div className="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eum!
              </div>
              {/* External link to open in a new tab */}
              <a
                className="see-more"
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                See More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="button">
        <button className="prev" aria-label="Previous"></button>
        <button className="next" aria-label="Next"></button>
      </div>

      {/* Gift button */}
      <div className="gift-button">
        <button className="select-gift">Select Gift</button>
      </div>
    </div>
  );
}
