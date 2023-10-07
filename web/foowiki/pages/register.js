import {createRef} from "react";

export default function Register() {

    const URL = "http://127.0.0.1:5000"

    let username = createRef()
    let password  = createRef()
    let confirm_password = createRef()

    function register(){
        if(username.current.value==""||password.current.value==""||confirm_password.current.value=="") {
            alert("请输入完整的信息")
            return
        }
        if(password.current.value!==confirm_password.current.value){
            alert("两次输入的密码不一致")
            return
        }

        let data = {
            "userid": 0,
            "username": username.current.value,
            "user_password": password.current.value
        }

        console.log(JSON.stringify(data))

        fetch(`${URL}/register`,{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>{
            return res.json()
        }).then(res=>{
            console.log(res)
            if(res.status==1){
                alert("注册失败")
            }else if(res.status==0){
                alert("注册成功")
                window.location.href="/"
            }
        })
    }

    return (
        <div>
          <div>
            <h1>Register</h1>
              <input type="text" name="Username" id="username" placeholder="Username" ref={username}></input>
              <input type="password" name="Password" id="password" placeholder="Password" ref={password}></input>
              <input type="password" name="ConfirmPassword" id="confirmPassword" placeholder="Confirm Password" ref={confirm_password}></input>
            <button type="submit" name="Register" id="registerButton" onClick={register}>Register</button>
          </div>
      </div>
    )
}