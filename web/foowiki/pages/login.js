import {createRef} from "React"

export default function Login(){
    let username = createRef()
    let password = createRef()

    const URL = "http://127.0.0.1:5000"

    function login(){
        if(username.current.value==""||password.current.value==""){
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
    }

    return (
        <div>
          <div>
            <h1>login</h1>
              <input type="text" name="Username" id="username" placeholder="Username" ref={username}></input>
              <input type="password" name="Password" id="password" placeholder="Password" ref={password}></input>
            <button type="submit" name="Register" id="registerButton" onClick={login}>Login</button>
          </div>
      </div>
    )
}