import {createRef} from "react";
import Container from "../components/container"
import Form_card from "../components/form_card"
import Image from "next/image";
import background from "../public/background.png"

export default function Register() {

    const URL = "http://127.0.0.1:5000"

    let username = createRef()
    let password = createRef()
    let confirm_password = createRef()

    function register() {
        if (username.current.value == "" || password.current.value == "" || confirm_password.current.value == "") {
            alert("请输入完整的信息")
            return
        }
        if (password.current.value !== confirm_password.current.value) {
            alert("两次输入的密码不一致")
            return
        }

        let data = {
            "userid": 0,
            "username": username.current.value,
            "user_password": password.current.value
        }

        console.log(JSON.stringify(data))

        fetch(`${URL}/register`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            if (res.status == 1) {
                alert("注册失败")
            } else if (res.status == 0) {
                alert("注册成功")
                window.location.href = "/"
            }
        })
    }

    return (
        <Container>
            <Form_card cardType={"register"} func={register}>
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