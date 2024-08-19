import React, { useEffect, useState } from "react";
import DevCards from "../src/components/DevCards";
import gameRise from "../src/helper/axios";

const DeveloperPages = () => {
  
  return (
    <div className="flex justify-center">
      <DevCards />
    </div>
  );
};

export default DeveloperPages;
