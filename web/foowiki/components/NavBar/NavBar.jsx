/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import {List2} from "@/components/List2";
import {Search} from "@/components/Search";
import "./style.css";
import Link from "next/link";

export const NavBar = ({className, icon = <List2/>, linkAdress = ""}) => {
    return (
        <nav className={`nav-bar row d-flex flex-wrap align-items-center ${className}`}>
            <div className="col-9">
                <div className="row d-flex flex-wrap align-items-center">
                    <div className="col-2">
                        {icon}
                    </div>
                    <div className="col-4" style={{minWidth: "content"}}>
                        <div className="text-wrapper-8">FooWiki</div>
                    </div>
                    <div className="col-2 offset-2" style={{minWidth: "content"}}>
                        <Link className="nav-link" href="/dishes">Dishes</Link>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="row">
                    <div className="col-1">
                        <Search className=""/>
                    </div>
                    <div className="col-2 offset-1">
                        <a className="user" href={linkAdress}></a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
