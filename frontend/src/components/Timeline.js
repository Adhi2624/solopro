import React, { useState, useEffect, useRef } from "react";
import { TiTick } from "react-icons/ti";
import "../css/steeper.css"; // Import the CSS file

const Stepper = () => {
  const steps = ["Create an Account", "Tell us about you", "Choose what you want", "You are In"];
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentStep(parseInt(entry.target.dataset.step));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    stepRefs.current.forEach((stepRef) => {
      observer.observe(stepRef);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentStep > 0 && currentStep <= steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
        if (currentStep === steps.length) {
          setComplete(true);
        }
      }, 1000); // Delay each step animation by 200ms
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  return (
    <div className="stepper-container">
      <div className="steps-wrapper">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(ref) => (stepRefs.current[i] = ref)}
            className={`step-item ${
              currentStep >= i + 1 ? "active" : ""
            } ${complete && currentStep > i + 1 ? "complete" : ""}`}
            data-step={i + 1}
          >
            <div className="step-circle">
              {currentStep > i + 1 || complete ? (
                <TiTick size={24} />
              ) : (
                i + 1
              )}
            </div>
            <p className="step-label">
              {step}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
