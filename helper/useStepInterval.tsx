"use client";

import { useState, useEffect } from "react";
import { useAnimation } from '@/helper/AnimationContext';
interface UseStepIntervalProps {
  maxStep: number;
  time: number;
}

const useStepInterval = ({ maxStep, time }: UseStepIntervalProps): number => {
  const [step, setStep] = useState(0);
  const { animationToggled } = useAnimation();
  useEffect(() => {
    if (!animationToggled) {
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