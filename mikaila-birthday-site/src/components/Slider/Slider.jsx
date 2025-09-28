import { useEffect, useRef } from "react";
import "./Slider.css";   // import the CSS

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
        <div className="item" style={{ backgroundImage: "url(https://i.ibb.co/qCkd9jS/img1.jpg)" }}>
          <div className="content">
            <div className="name">Switzerland</div>
            <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eum!</div>
            <button>See More</button>
          </div>
        </div>

        <div className="item" style={{ backgroundImage: "url(https://i.ibb.co/jrRb11q/img2.jpg)" }}>
          <div className="content">
            <div className="name">Finland</div>
            <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eum!</div>
            <button>See More</button>
          </div>
        </div>

        <div className="item" style={{ backgroundImage: "url(https://i.ibb.co/NSwVv8D/img3.jpg)" }}>
          <div className="content">
            <div className="name">Iceland</div>
            <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eum!</div>
            <button>See More</button>
          </div>
        </div>

        <div className="item" style={{ backgroundImage: "url(https://i.ibb.co/Bq4Q0M8/img4.jpg)" }}>
          <div className="content">
            <div className="name">Australia</div>
            <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eum!</div>
            <button>See More</button>
          </div>
        </div>

        <div className="item" style={{ backgroundImage: "url(https://i.ibb.co/jTQfmTq/img5.jpg)" }}>
          <div className="content">
            <div className="name">Netherland</div>
            <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eum!</div>
            <button>See More</button>
          </div>
        </div>

        <div className="item" style={{ backgroundImage: "url(https://i.ibb.co/RNkk6L0/img6.jpg)" }}>
          <div className="content">
            <div className="name">Ireland</div>
            <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eum!</div>
            <button>See More</button>
          </div>
        </div>
      </div>

      <div className="button">
        <button className="prev" aria-label="Previous">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="next" aria-label="Next">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
