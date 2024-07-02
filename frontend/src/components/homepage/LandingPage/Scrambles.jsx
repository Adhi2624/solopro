import React, { useState, useEffect, useCallback } from 'react';

const Scrambles = ({ text }) => {
  const shuffle = (word) => {
    return word
      .split("")
      .sort(() => {
        return 0.5 - Math.random();
      })
      .join("");
  };

  const gen = useCallback(() => {
    let textArray = [];
    if (text) {
      for (let i = text.length; i >= 0; i--) {
        let tmp = shuffle(text);
        tmp = tmp.slice(0, text.length - i);
        textArray.push(tmp);
      }
      for (let i = 0; i < 6; i++) {
        textArray.push(shuffle(text));
      }
      textArray.push(text);
    }
    return textArray;
  }, [text]);

  const [textArray] = useState(gen);
  const [activeText, setActiveText] = useState(0);
  const [play, setPlay] = useState(false);

  const click = useCallback(() => {
    if (activeText === textArray.length - 1) {
      setActiveText(0);
    }
    setPlay(true);
  }, [activeText, textArray.length]);

  useEffect(() => {
    let interval = null;
    if (play && activeText < textArray.length - 1) {
      interval = setInterval(() => {
        setActiveText((prevActiveText) => prevActiveText + 1);
      }, 90);
    } else if (!play) {
      click();
    }
    return () => clearInterval(interval);
  }, [play, activeText, textArray.length, click]);

  return (
    <div onClick={click}>
      <h3 className="mt-2" style={{ color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(135deg, #0fd2ab, #783ff5)" }}>{textArray[activeText]}</h3>
    </div>
  );
};

export default Scrambles;
