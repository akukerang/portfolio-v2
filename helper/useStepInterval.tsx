"use client";

import { useState, useEffect } from "react";

interface UseStepIntervalProps {
  maxStep: number;
  time: number;
}

const useStepInterval = ({ maxStep, time }: UseStepIntervalProps): number => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const animationEnabled = localStorage.getItem("animationEnabled");

    if (!animationEnabled || animationEnabled === "false") {
      setStep(maxStep);
    } else {
      const interval = setInterval(() => {
        setStep((prevStep) => {
          if (prevStep >= maxStep) {
            clearInterval(interval);
            return prevStep;
          }
          return prevStep + 1;
        });
      }, time);
      return () => clearInterval(interval);
    }
  }, [maxStep, time]);

  return step;
};

export default useStepInterval;