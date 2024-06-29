import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../images/exped.json';
import './Lotie.css'; 

const Lotie = () => {
  return (
    <div className="lottie-container">
      <div className="animated">
        <Lottie animationData={animationData} />
      </div>
      <div className="text-content-animated">
        <p className="headline">Begin Your Expedition</p>
        <p className="subheadline">Leap into the future with VioletVanguard.</p>
        <button className='jump'>Jump In</button>
      </div>
    </div>
  );
};

export default Lotie;
