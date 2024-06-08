import React, { useState, useEffect, useRef } from "react";
import { TiTick } from "react-icons/ti";

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
      }, 100000); // Delay each step animation by 200ms
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(ref) => (stepRefs.current[i] = ref)}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
            }}
            className={`step-item ${
              currentStep >= i + 1 ? "active" : ""
            } ${complete && currentStep > i + 1 ? "complete" : ""}`}
            data-step={i + 1}
          >
            <div
              style={{
                width: 90,
                height: 90,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                position: "relative",
                backgroundColor:
                  currentStep > i ? "green" : "slate", // Apply green color to the circles up to the current step
                borderRadius: "50%",
                fontWeight: 600,
                color: "white",
              }}
              className="step"
            >
              {currentStep > i + 1 || complete ? (
                <TiTick size={24} />
              ) : (
                i + 1
              )}
            </div>
            <p
              style={{
                color: complete ? "white" : "Green",width: 100,fontStyle:"montserrat",textAlign: "center",
              }}
              className="text-gray-500"
            >
              {step}
            </p>
            {i !== steps.length - 1 && (
              <div
                style={{
                  content: "",
                  backgroundColor: "slate",
                  direction: "flex",
                  width: "100%",
                  height: 9,
                  right: "70%",
                  top: "33.33%",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
