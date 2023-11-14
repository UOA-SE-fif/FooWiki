/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import {Lettuce} from "@/components/Lettuce";
import {Meat3} from "@/components/Meat3";
import {RiceBowl} from "@/components/RiceBowl";
import "./style.css";

export const DishesCard = ({className, item}) => {
    return (
        <div className={`dishes-card container-fluid ${className}`}>
            <div className="row  d-flex align-items-stretch">
                <div className="col-4 text-center d-flex align-items-center">
                    <div className="dishes-pic"/>
                </div>
                <div className="col-8 d-flex flex-column">
                    <div className="row align-items-center" style={{height:"40%"}}>
                        <div className="col-6">{item.dishname}</div>
                        <div className="col-3">{item.price + "￥"}</div>
                        <img className="" alt="Line" src="/img/line-1-2.svg"/>
                    </div>
                    <div className="row" style={{height:"40%"}}>
                        <div className="">{item.describe ? item.describe : ""}</div>
                    </div>
                    <div className="row" style={{height:"20%"}}>
                        <div className="col-4">
                            <RiceBowl className=""/>
                            <div className="">{item.satiety ? item.satiety : "Num"}</div>
                        </div>
                        <div className="col-4">
                            <Meat3 className=""/>
                            <div className="">{item.meat ? item.meat : "Num"}</div>
                        </div>
                        <div className="col-4">
                            <Lettuce className=""/>
                            <div className="">{item.vegetables ? item.vegetables : "Num"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
