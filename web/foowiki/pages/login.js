import {createRef} from "react"
import Container from "../components/container"
import Form_card from "../components/form_card"
import Image from "next/image";
import background from "../public/background.png"

export default function Login() {
    let username = createRef()
    let password = createRef()

    const URL = "http://127.0.0.1:5000"

    function login() {
        if (username.current.value === "" || password.current.value === "") {
            alert("请输入完整的信息")
            return
        }

        let data = {
            "username": username.current.value,
            "user_password": password.current.value
        }

        fetch(`${URL}/login`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                    alert("登录成功")
                    window.location.href = "/dishes"
                }
            )
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