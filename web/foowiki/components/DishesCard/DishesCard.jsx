/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Lettuce } from "@/components/Lettuce";
import { Meat3 } from "@/components/Meat3";
import { RiceBowl } from "@/components/RiceBowl";
import "./style.css";

export const DishesCard = ({ className }) => {
  return (
    <div className={`dishes-card ${className}`}>
      <div className="dishes-pic" />
      <div className="text-wrapper-4">Name</div>
      <img className="line" alt="Line" src="/img/line-1-2.svg" />
      <div className="text-wrapper-5">Description</div>
      <div className="rice">
        <RiceBowl className="icon-instance-node" />
        <div className="text-wrapper-6">Num</div>
      </div>
      <div className="rice-2">
        <Meat3 className="icon-instance-node" />
        <div className="text-wrapper-6">Num</div>
      </div>
      <div className="rice-3">
        <Lettuce className="icon-instance-node" />
        <div className="text-wrapper-6">Num</div>
      </div>
      <div className="text-wrapper-7">12¥</div>
    </div>
  );
};
