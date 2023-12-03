/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Selector = ({ className,name, options, onChange, id,defaultValue}) => {
  return (
    /*<div className={`selector ${className}`}>
      <div className="element-floor">{text}</div>
      <div className="group">
        <div className="overlap-group">
          <img className="img" alt="Line" src="/img/line-2.svg" />
          <img className="line-2" alt="Line" src="/img/line-3-3.svg" />
        </div>
      </div>
    </div>*/
      // <div className="container">
      <select className="form-select selector" name={name} id={id} onChange={onChange} >
          <option value="0">{defaultValue}</option>
          {options.map((option, index) => {
                    return <option key={index} value={option}>{option}</option>
                })}
      </select>
      // </div>
  );
};

Selector.propTypes = {
  text: PropTypes.string,
};
