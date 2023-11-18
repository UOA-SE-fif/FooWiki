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
import React from "react";


//响应的屏幕宽度
const changeWidth = 500
//url
const localURL="http://127.0.0.1:5000"
const remoteURL=""
const URL = localURL


export async function getServerSideProps(context){
    try {
    // 向后端请求
        const headerCookies = context.req.headers.cookie
        //拆cookies
        const Cookies = headerCookies?headerCookies.split('; ').reduce((acc,cookies)=>{
            const [name,value] = cookies.split('=')
            acc[name] = decodeURIComponent(value)
            return acc
        },{}):{}
        const fooWikiCookie = Cookies['fooWikiAuth']?Cookies['fooWikiAuth']:null

        const userRes = await fetch(`${URL}/info`,{
        method:"GET",
        credentials: 'include',
        headers:{
            'Authorization':`Bearer ${fooWikiCookie}`
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
    return {
        props:{}
    };
  }
}

const HomePage = ({screenWidth, screenHeight,userData,fooWikiCookie}) => {
    if (screenWidth <= changeWidth) {
        return (
            <div>
                <NavBar linkAdress="/login"></NavBar>
                <div>
                    <div>
                        <Title text="Recent&nbsp;&nbsp;Comments"/>
                        <div className="canteens-container">
                        <div className="canteen-container">
                            <div className="xi-yuan">Xiyuan</div>
                            <div className="text-wrapper-10">1st Floor</div>
                            <div className="text-wrapper-11">2nd Floor</div>
                            <div className="text-wrapper-12">3rd Floor</div>
                            <div className="peoples">
                                <People1 className="people"/>
                                <People1 className="people-1"/>
                            </div>
                            <div className="peoples-2">
                                <People1 className="people-1-instance"/>
                                <People1 className="people"/>
                                <People1 className="people-1"/>
                            </div>
                            <div className="peoples-3">
                                <People1 className="people-2"/>
                                <People1 className="people-1-instance"/>
                                <People1 className="people"/>
                                <People1 className="people-1"/>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div>
                        <div>Recommendation</div>
                    </div>
                    <div>
                        <Title className="title-instance" text="Canteens"/>
                        <CommentCard/>
                        <CommentCard/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Nav_bar></Nav_bar>
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
    return <HomePage screenHeight={screenSize.height} screenWidth={screenSize.width} userData={userData} fooWikiCookie={fooWikiCookie}></HomePage>
}
