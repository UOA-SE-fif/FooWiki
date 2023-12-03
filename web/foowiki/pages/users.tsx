import type { NextPage } from "next";
import styles from "./users.module.css";
import {NavBar} from "../components/NavBar";
import React from "react";
import Link from "next/link";

const localURL = "http://127.0.0.1:5000"
const remoteURL = ""
const URL = localURL
const apiVision = "v1"

const v1UserApi = `${URL}/api/v1/user/{api}`

export async function getServerSideProps(context){

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

        const userRes = await fetch(v1UserApi.replace("{api}","info"), {
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
const FooWikiUser: NextPage = ({fooWikiCookie,userData}) => {
  console.log(userData)
  return (
    <div className={styles.foowikiUser}>
      <NavBar className="" linkAdress="/login" userData={userData}></NavBar>
      <div className={styles.foowikiUserChild} />
      <div className={styles.userParent}>
        <img className={styles.userIcon1} alt="" src={userData.data.useravatar} />
        <div className={styles.username}>{userData.data.username}</div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frame}>
          <div className={styles.title}>
            <div className={styles.title1}>Info</div>
          </div>
          <div className={styles.frame1}>
            <div className={styles.container} />
            <div className={styles.frame2}>
              <div className={styles.email}>{`Email: ${userData.data.useremail}`}</div>
            </div>
            <div className={styles.frame3}>
              <div className={styles.flavor}>Flavor: {userData.data.userflavor?userData.data.userflavor:"null"}</div>
            </div>
            <div className={styles.frame4}>
              <div className={styles.appetite}>Appetite: {userData.data.userappetite?userData.data.userappetite:"null"}</div>
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <div className={styles.container1} />
          <Link className={styles.login} href="/">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default FooWikiUser;
