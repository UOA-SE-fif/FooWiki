import Container from "../components/container"
import Form_card from "../components/form_card"
import Image from "next/image";
import background from "../public/background.png"
import {username, password, confirm_password,email} from "../components/form_card";

export default function Register() {

    const localURL = "http://127.0.0.1:5000"
    const remoteURL = "http://175.178.154.171:5000"
    const URL = localURL

    const v1UserApi = `${URL}/api/v1/user/{api}`

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
                alert("用户名已注册")
            }else if (res.code == 0) {
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