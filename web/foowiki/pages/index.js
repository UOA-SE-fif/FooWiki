import Link from 'next/link'
import Container from '../components/container'
import Nav_bar from "../components/nav_bar";
import styles from "./scss/index.scss"
import useScreenSize from '../Hook/useScreenSize'
import {Title} from "@/components/Title";
import {CommentCard} from "@/components/CommentCard";
import {DishesCard} from "@/components/DishesCard";
import {People1} from "@/components/People1";
import {NavBar} from "@/components/NavBar";
import {List} from "@/components/List";
import {useEffect} from 'react';
import React from "react";


//响应的屏幕宽度
const changeWidth = 500
//url
const localURL = "http://127.0.0.1:5000"
const remoteURL = ""
const URL = localURL


export async function getServerSideProps(context) {
    try {
        // 向后端请求
        const headerCookies = context.req.headers.cookie
        //拆cookies
        const Cookies = headerCookies ? headerCookies.split('; ').reduce((acc, cookies) => {
            const [name, value] = cookies.split('=')
            acc[name] = decodeURIComponent(value)
            return acc
        }, {}) : {}
        const fooWikiCookie = Cookies['fooWikiAuth'] ? Cookies['fooWikiAuth'] : null

        const userRes = await fetch(`${URL}/info`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${fooWikiCookie}`
            }
        })

        const userData = await userRes.json();
        // 返回数据
        return {
            props: {
                fooWikiCookie,
                userData
            }
        };
    } catch (error) {
        const userData = {}
        return {
            props: {
                userData
            }
        };
    }
}

const HomePage = ({screenWidth, screenHeight, userData, fooWikiCookie}) => {
    if (screenWidth <= changeWidth) {
        return (
            <div className="container-fluid h-100" style={{height: "25vh"}}>
                <NavBar linkAdress="/login" userData={userData}></NavBar>
                <div className="row mt-4 mx-auto d-flex justify-content-center">
                    <div className="row h-25">
                        <Title text="Recent&nbsp;&nbsp;Comments"/>
                        <div className="canteens-container col-12">
                            <div className="canteen-container">
                                <div className="foowikiFont mt-2">Xiyuan</div>
                                <div className="row mt-2 mb-2">
                                    <div className="col-6">
                                        <div style={{paddingLeft: "10px"}}>1st Floor</div>
                                    </div>
                                    <div className="col-6">
                                        <People1 className="people"/>
                                        <People1 className="people-1"/>
                                    </div>
                                </div>
                                <div className="row mt-2 mb-2">
                                    <div className="col-6">
                                        <div style={{paddingLeft: "10px"}}>2nd Floor</div>
                                    </div>
                                    <div className="col-6">
                                        <People1 className="people-1-instance"/>
                                        <People1 className="people"/>
                                        <People1 className="people-1"/>
                                    </div>
                                </div>
                                <div className="row mt-2 mb-2">
                                    <div className="col-6">
                                        <div style={{paddingLeft: "10px"}}>3rd Floor</div>
                                    </div>
                                    <div className="col-6">
                                        <People1 className="people-2"/>
                                        <People1 className="people-1-instance"/>
                                        <People1 className="people"/>
                                        <People1 className="people-1"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row h-25">
                        <Title text="Recommendation"></Title>
                        <div className="" style={{height: "50px"}}>
                            <text className="foowikiFont">login to read more</text>
                        </div>
                    </div>
                    <div className="row h-25">
                        <Title className="title-instance" text="Canteens"/>
                        <CommentCard className="col-12"/>
                        <CommentCard className="col-12"/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Nav_bar user={userData}></Nav_bar>
                <Container>
                    <div className={"row vh-100"}>
                        <div className={"align-items-center d-flex"}>
                            <h1>Welcome to FooWiki</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}


export default function Home({fooWikiCookie,userData}) {
    const screenSize = useScreenSize();
    return <HomePage screenHeight={screenSize.height} screenWidth={screenSize.width} userData={userData}
                     fooWikiCookie={fooWikiCookie}></HomePage>
}
