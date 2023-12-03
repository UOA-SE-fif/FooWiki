import type {NextPage} from "next";
import styles from "./scss/login.module.css";
import useScreenSize from '../Hook/useScreenSize'
import Container from "../components/container"
import Form_card from "../components/form_card"
import Image from "next/image";
import Link from "next/link";
import background from "../public/background.png"
import {username, password} from "../components/form_card";
import {NavBar} from "../components/NavBar";
import React from "react";

const localURL = "http://127.0.0.1:5000"
const remoteURL = "http://175.178.154.171:5000"
const URL = localURL

const changeWidth = 500

async function login() {
    if (username.current.value === "" || password.current.value === "") {
        alert("请输入完整的信息")
        return
    }

    let data = new FormData()
    data.append('username', username.current.value)
    data.append('password', password.current.value)

    const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString()
    })
    const resData = await response.json()
    console.log(resData)
    if (resData.code == 0) {
        alert("success")
        window.location = '/dishes'
    } else if (resData.code == 203) {
        alert("username or password don't match")
    } else {
        alert("fail to login")
    }
}

const Login: NextPage = () => {
    const screenSize = useScreenSize();
    if (screenSize.width < changeWidth)
        return (
            <div className={styles.foowikiLogin}>
                <div className="container-fluid">
                <NavBar userData={{}}></NavBar>
                </div>
                <div className={styles.login}>
                    <div className={styles.title}>
                        <div className={styles.title1}>Login</div>
                    </div>
                    <div className={styles.loginCard}>
                        <div className={styles.container}/>
                        <div className={styles.title2}>
                            <div className={styles.title1}>Email/Username</div>
                        </div>
                        <div className={styles.selector}>
                            <input ref={username} className={styles.container1}/>
                            <div className={styles.stFloor}>1st Floor</div>
                            <img className={styles.selectorChild} alt="" src="/group-2.svg"/>
                        </div>
                        <div className={styles.title4}>
                            <div className={styles.title1}>Password</div>
                        </div>
                        <div className={styles.selector1}>
                            <input ref={password} type="password" className={styles.container1}/>
                            <div className={styles.stFloor}>1st Floor</div>
                            <img className={styles.selectorChild} alt="" src="/group-2.svg"/>
                        </div>
                    </div>
                </div>
                <div className={styles.noAccountCreateContainer}>
                    <span>{`No account?   `}</span>
                    <Link href="/register" className={styles.createOne}>Create one</Link>
                </div>
                <div className={styles.button}>
                    <button className={styles.container1} onClick={login}>
                        <div className={styles.login1}>Login</div>
                    </button>
                </div>
            </div>
        );
    else
        return (
            <Container>
                <Form_card cardType={"login"} func={login}>
                </Form_card>
                <Image src={background} alt="background"
                       layout="fill"
                       objectFit="cover"
                       quality={100}
                       priority={true}
                       style={{zIndex: -1}}
                ></Image>
            </Container>
        )
}

export default Login;
