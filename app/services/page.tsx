import React from "react";
import Command from "@/components/command";
import ServiceInfo from "@/components/serviceInfo";
const Services = () => {
  return (
    <div>
      <Command command="cd Services" />
      <ServiceInfo />
      <Command filePath="Services/" command="|" />
    </div>
  );
};
export default Services;
