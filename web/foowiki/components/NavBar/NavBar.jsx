/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import {List2} from "@/components/List2";
import {Search} from "@/components/Search";
import "./style.css";
import Link from "next/link";

export const NavBar = ({className, icon = <List2 className=""/>, linkAdress = ""}) => {
    return (
        <nav className={`nav-bar row d-flex align-items-center ${className}`}>
            <div className="col-1">
                {icon}
            </div>
            <div className="col-4 text-left">
                <div className="text-wrapper-8">FooWiki</div>
            </div>
            <div className="col-2 text-left">
                <Link className="dishes nav-link" href="/dishes">Dishes</Link>
            </div>
            <div className="col-1 offset-2">
                <Search className=""/>
            </div>
            <div className="col-2">
                <a className="user" href={linkAdress}></a>
            </div>
        </nav>
    );
};
