import {json} from "body-parser";

export default async function handler(req,res){
    const localURL = "http://127.0.0.1:5000"
    const remoteURL = "http://175.178.154.171:5000"
    const URL = localURL

    console.log(req.body)
    const formData = new FormData()
    formData.append('username',req.body.username)
    formData.append('password',req.body.password)

    const data = await fetch(`${URL}/token`, {
            method: "POST",
            body: formData
        })
    const detial = await data.json()
    const token = detial.data.token
    console.log(token)
    res.setHeader('Set-Cookie','fooWikiAuth='+token+'; Path=/; HttpOnly');

    res.status(data.status).json({code:detial.code})
}
