export default async function handler(req,res){
    const localURL = "http://127.0.0.1:5000"
    const remoteURL = "http://175.178.154.171:5000"
    const URL = localURL

    console.log(typeof req.body)

    const data = await fetch(`${URL}/login`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(req.body)
        })
    const token = (await data.json()).data.token
    console.log(token)
    res.setHeader('Set-Cookie','fooWikiAuth='+token+'; Path=/; HttpOnly');

    res.status(200).json(data)
}
