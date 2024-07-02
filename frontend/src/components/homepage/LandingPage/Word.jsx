import React from 'react';
import './word.css';

const WordPullUp = ({ className, words }) => {
  return (
    <div className={className}>
      {words.split(' ').map((word, index) => (
        <span key={index} className="word-pull-up-word">
          {word}{' '}
        </span>
      ))}
    </div>
  );
};

const WordPullUpDemo = () => {
  return (
    <>
      <div className="container text-center my-5">
        <WordPullUp
          className="word-pull-up text-4xl font-weight-bold tracking-tight text-dark"
          words="Begin Your Expedition"
        />
      </div>
      <div className="container text-center my-5">
        <WordPullUp
          className="word-pull-up text-4xl font-weight-bold tracking-tight text-dark"
          words="Leap into the future with VioletVanguard."
        />
      </div>
    </>
  );
};

export default WordPullUpDemo;
