import type { NextPage } from "next";
import styles from "./scss/login.module.css";
import Container from "../components/container"
import Form_card from "../components/form_card"
import Image from "next/image";
import background from "../public/background.png"
import useScreenSize from '../Hook/useScreenSize'
import {username, password, confirm_password,email} from "../components/form_card";
import Link from "next/link";
import {NavBar} from "../components/NavBar";
import React from "react";

    const localURL = "http://127.0.0.1:5000"
    const remoteURL = "http://175.178.154.171:5000"
    const URL = localURL

    const v1UserApi = `${URL}/api/v1/user/{api}`

    const changeWidth = 500

function register() {
        if (username.current.value == "" || password.current.value == "" || confirm_password.current.value == ""||email.current.value=="") {
            alert("请输入完整的信息")
            return
        }
        if (password.current.value !== confirm_password.current.value) {
            alert("两次输入的密码不一致")
            return
        }

        //检查email格式
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email.current.value)){
            alert("请输入正确的邮箱地址")
            return
        }


        let data = {
            "username": username.current.value,
            "useremail":email.current.value,
            "user_password": password.current.value,
        }

        console.log(JSON.stringify(data))

        fetch(v1UserApi.replace("{api}","register"), {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            if (res.code == 202) {
                alert("注册失败")
            }else if(res.code==201){
                alert("the username or email has already register")
            }else if (res.code == 0) {
                alert("success")
                window.location.href = "/login"
            }
        })
}

const Register: NextPage = () => {
    const screenSize = useScreenSize();

    if(screenSize.width<changeWidth)
        return (
            <div className={styles.foowikiLogin}>
                <div className="container-fluid">
                <NavBar userData={{}}></NavBar>
                </div>
                <div className={styles.register}>
                    <div className={styles.title}>
                        <div className={styles.title1}>Register</div>
                    </div>
                    <div className={styles.registerCard}>
                        <div className={styles.registerContainer}/>
                        <div className={styles.title2}>
                            <div className={styles.title1}>Username</div>
                        </div>
                        <div className={styles.selector}>
                            <input ref={username} className={styles.container1}/>
                            {/*<div className={styles.stFloor}>1st Floor</div>*/}
                            {/*<img className={styles.selectorChild} alt="" src="/group-2.svg"/>*/}
                        </div>
                        <div className={styles.title4}>
                            <div className={styles.title1}>Email</div>
                        </div>
                        <div className={styles.selector1}>
                            <input ref={email} className={styles.container1}/>
                            {/*<div className={styles.stFloor}>1st Floor</div>*/}
                            {/*<img className={styles.selectorChild} alt="" src="/group-2.svg"/>*/}
                        </div>
                        <div className={styles.title5}>
                            <div className={styles.title1}>Password</div>
                        </div>
                        <div className={styles.selector2}>
                            <input ref={password} type="password" className={styles.container1}/>
                            {/*<div className={styles.stFloor}>1st Floor</div>*/}
                            {/*<img className={styles.selectorChild} alt="" src="/group-2.svg"/>*/}
                        </div>
                        <div className={styles.title6}>
                            <div className={styles.title1}>Confirm&nbsp;&nbsp;Password</div>
                        </div>
                        <div className={styles.selector3}>
                            <input ref={confirm_password} type="password" className={styles.container1}/>
                            {/*<div className={styles.stFloor}>1st Floor</div>*/}
                            {/*<img className={styles.selectorChild} alt="" src="/group-2.svg"/>*/}
                        </div>
                    </div>
                </div>

                <div className={styles.button} style={{top:'650px'}}>
                    <button className={styles.container1} >
                        <div className={styles.login1} onClick={register}>register</div>
                    </button>
                </div>
                <Link href="/login" className={styles.createOne}>To Login</Link>
            </div>
        )
    else
        return (
        <Container>
            <Form_card cardType={"register"} func={register}>
            </Form_card>
            <Image src={background} alt="background"
                   fill
                   quality={100}
                   priority={true}
                   style={{
                       zIndex: -1,
                       objectFit: "cover"
                   }}
            ></Image>
        </Container>
    )
}

export default Register;