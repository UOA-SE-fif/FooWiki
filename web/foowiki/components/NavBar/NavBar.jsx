/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import {List2} from "../List2";
import {Search} from "../Search";
import "./style.css";
import Link from "next/link";

export const NavBar = ({className, icon = <List2 data-bs-toggle="offcanvas"/>, linkAdress = "", userData}) => {
    let userElement;
    if (userData.data) {
        userElement = <div className="col-2 offset-1">
            <img className="user" src={userData.data.useravatar}></img>
        </div>
    } else {
        userElement = <div className="col-2 offset-1">
            <a className="user" href={linkAdress}></a>
        </div>
    }
    return (
        <div>
            <nav className={`nav-bar row d-flex flex-wrap align-items-center ${className}`}>
                <div className="col-9">
                    <div className="row d-flex flex-wrap align-items-center">
                        <div className="col-2">
                            <Link href="#offcanvasExample" data-bs-toggle="offcanvas">{icon}</Link>
                        </div>
                        <div className="col-4" style={{minWidth: "content"}}>
                            <Link className="text-wrapper-8" href="/">FooWiki</Link>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-1">
                            <Search className=""/>
                        </div>
                        {userElement}
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample"
                 aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div><Link href="/">Home</Link></div>
                    <div><Link href="/users">User</Link></div>
                    <div><Link href="/dishes">dishes</Link></div>
                </div>
            </div>
            <script src="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="https://cdn.staticfile.org/popper.js/2.9.3/umd/popper.min.js"></script>
        </div>
    );
};
