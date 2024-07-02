import "./Box.css";

import { useState, useRef, useEffect } from "react";
import team from '../images/team.png';

function Box() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );
    console.log(isIntersecting);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      ref.current.querySelectorAll("div").forEach((el) => {
        el.classList.add("slide-in");
      });
    } else {
      ref.current.querySelectorAll("div").forEach((el) => {
        el.classList.remove("slide-in");
      });
    }
  }, [isIntersecting]);

  return (
    <div className="Box">
      <main ref={ref}>
        <div className="child-one"><img src={team} alt="logo" /></div>
        <div className="child-two">
          <span className="Content"><p className="headder">Join Our Elite Squad of Champions!</p>
          <p>Enhance your intellect and wisdom.</p>
          <button>Progress with Us</button></span>
        </div>
      </main>
    </div>
  );
}

export default Box;