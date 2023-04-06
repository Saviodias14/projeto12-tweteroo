import express from "express"
import cors from "cors"

const users = []
const tweets = []
const app = express()

//app.use(cors())
app.use(express.json())

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    console.log(req.body)
    if (!username || !avatar||(typeof(username)!=="string")||(typeof(avatar)!=="string")) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    users.push({ username, avatar })
    res.send("ok")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    const user = users.find((u) => u.username === username)
    if (!username || !tweet||(typeof(username)!=="string")||(typeof(tweet)!=="string")) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    if (!user) {
        return res.status(401).send("UNAUTHORIZED")
    }
    let avatar = user.avatar
    tweets.push({ username, avatar, tweet })
    res.send("ok")
})

app.get("/tweets", (req, res)=>{
    if(tweets.length>10){
        const tenTweets = tweets.filter((t,i)=>i>=tweets.length-10?t:'')
        res.send(tenTweets)
    }else{
        res.send(tweets)
    }
})

const PORT = 5000
app.listen(PORT, () => console.log(`App funcionando na porta ${PORT}`))