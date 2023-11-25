import Container from "../components/container"
import Form_card from "../components/form_card"
import Image from "next/image";
import background from "../public/background.png"
import {username, password} from "../components/form_card";

export default function Login() {

    const localURL = "http://127.0.0.1:5000"
    const remoteURL = "http://175.178.154.171:5000"
    const URL = localURL

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
        if(response.ok){
            alert("登录成功")
            // window.location='/dishes'
        }else{
            alert("登录失败")
        }
    }

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