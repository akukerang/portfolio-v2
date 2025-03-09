"use client"

import React from "react";
import Command from "@/components/command";
import useStepInterval from "@/helper/useStepInterval";
import ServiceInfo from "@/components/serviceInfo";
const Services = () => {
  const step = useStepInterval({maxStep:3, time:300});
  return (
    <div>
      {step >= 1 && <Command command="cd Services"/>}
      {step >= 2 && <ServiceInfo />}
      {step >= 3 && <Command filePath="Services/" command="|" />}
    </div>
  );
};
export default Services;
