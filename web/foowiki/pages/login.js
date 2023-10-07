import {createRef} from "react"

export default function Login(){
    let username = createRef()
    let password = createRef()

    const URL = "http://127.0.0.1:5000"

    function login(){
        if(username.current.value===""||password.current.value===""){
            alert("请输入完整的信息")
            return
        }

        let data = {
        "username":username.current.value,
        "user_password":password.current.value
        }

        fetch(`${URL}/login`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>{
            alert("登录成功")
            window.location.href="/dishes"
            }
        )
    }

    return (
        <div className="container">
          <div className="col-sm-4 offset-4">
            <h1>login</h1>
              <input className="form-control" type="text" name="Username" id="username" placeholder="Username" ref={username}></input>
              <input className="form-control" type="password" name="Password" id="password" placeholder="Password" ref={password}></input>
              <button className="btn" type="submit" name="Register" id="registerButton" onClick={login}>Login</button>
          </div>
      </div>
    )
}