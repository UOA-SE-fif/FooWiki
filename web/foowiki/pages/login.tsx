import type { NextPage } from "next";
import styles from "./scss/login.module.css";
import useScreenSize from '../Hook/useScreenSize'
import Container from "../components/container"
import Form_card from "../components/form_card"
import Image from "next/image";
import background from "../public/background.png"
import {username, password} from "../components/form_card";

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
        data.append('username',username.current.value)
        data.append('password',password.current.value)

        const response = await fetch(`/api/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data).toString()
            })
        const resData = await response.json()
        console.log(resData)
        if(resData.code==0){
            alert("登录成功")
            window.location='/dishes'
        }else if(resData.code==203){
            alert("用户名和密码错误")
        }else{
            alert("登录失败")
        }
    }
const phoneLogin: NextPage = () => {
  return (
    <div className={styles.foowikiLogin}>
      <div className={styles.navBar}>
        <img className={styles.listIcon} alt="" src="/list.svg" />
        <div className={styles.foowiki}>FooWiki</div>
      </div>
      <div className={styles.login}>
        <div className={styles.title}>
          <div className={styles.title1}>Login</div>
        </div>
        <div className={styles.loginCard}>
          <div className={styles.container} />
          <div className={styles.title2}>
            <div className={styles.title1}>Email/Username</div>
          </div>
          <div className={styles.selector}>
            <div className={styles.container1} />
            <div className={styles.stFloor}>1st Floor</div>
            <img className={styles.selectorChild} alt="" src="/group-2.svg" />
          </div>
          <div className={styles.title4}>
            <div className={styles.title1}>Password</div>
          </div>
          <div className={styles.selector1}>
            <div className={styles.container1} />
            <div className={styles.stFloor}>1st Floor</div>
            <img className={styles.selectorChild} alt="" src="/group-2.svg" />
          </div>
        </div>
      </div>
      <div className={styles.noAccountCreateContainer}>
        <span>{`No account?   `}</span>
        <span className={styles.createOne}>Create one</span>
      </div>
      <div className={styles.button}>
        <div className={styles.container1} />
        <div className={styles.login1}>Login</div>
      </div>
    </div>
  );
};

const pcLogin: NextPage = () =>{
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

const Login: NextPage = () =>{
    const screenSize = useScreenSize();
    if(screenSize.width<changeWidth)
        return (
    <div className={styles.foowikiLogin}>
      <div className={styles.navBar}>
        <img className={styles.listIcon} alt="" src="/list.svg" />
        <div className={styles.foowiki}>FooWiki</div>
      </div>
      <div className={styles.login}>
        <div className={styles.title}>
          <div className={styles.title1}>Login</div>
        </div>
        <div className={styles.loginCard}>
          <div className={styles.container} />
          <div className={styles.title2}>
            <div className={styles.title1}>Email/Username</div>
          </div>
          <div className={styles.selector}>
            <div className={styles.container1} />
            <div className={styles.stFloor}>1st Floor</div>
            <img className={styles.selectorChild} alt="" src="/group-2.svg" />
          </div>
          <div className={styles.title4}>
            <div className={styles.title1}>Password</div>
          </div>
          <div className={styles.selector1}>
            <div className={styles.container1} />
            <div className={styles.stFloor}>1st Floor</div>
            <img className={styles.selectorChild} alt="" src="/group-2.svg" />
          </div>
        </div>
      </div>
      <div className={styles.noAccountCreateContainer}>
        <span>{`No account?   `}</span>
        <span className={styles.createOne}>Create one</span>
      </div>
      <div className={styles.button}>
        <div className={styles.container1} />
        <div className={styles.login1}>Login</div>
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
