/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { List2 } from "@/components/List2";
import { Search } from "@/components/Search";
import "./style.css";
import Link from "next/link";

export const NavBar = ({ className, icon = <List2 className="list-2" /> ,linkAdress=""}) => {
  return (
    <div className={`nav-bar ${className}`}>
      <Search className="search-instance" />
      <a className="user" href={linkAdress}></a>
      <div className="logo">
        <div className="text-wrapper-8">FooWiki</div>
      </div>
        <Link className="dishes nav-link" href="/dishes">Dishes</Link>
      {icon}
    </div>
  );
};
