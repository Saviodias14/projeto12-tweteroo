import express from "express"
import cors from "cors"

const users = []
const tweets = []
const app = express()

app.use(cors())
app.use(express.json())

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    console.log(req.body)
    if (!username || !avatar || (typeof (username) !== "string") || (typeof (avatar) !== "string")) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    users.push({ username, avatar })
    res.status(201).send("ok")
})

app.post("/tweets", (req, res) => {
    const { tweet } = req.body
    const {user} = req.headers
    const userCheck = users.find((u) => u.username === user)
    if (!user || !tweet || (typeof (user) !== "string") || (typeof (tweet) !== "string")) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    if (!userCheck) {
        return res.status(401).send("UNAUTHORIZED")
    }
    let avatar = userCheck.avatar
    tweets.push({ username:user, avatar, tweet })
    res.status(201).send("ok")
})

app.get("/tweets", (req, res) => {
    const { page } = req.query

    if (page === undefined) {
        const tenTweets = tweets.filter((t, i) => i >= tweets.length - 10 ? t : '')
        return res.send(tenTweets)
    }
    if (Number(page) >= 1 && (tweets.length%10===0&&tweets.length!==0?Number(page)<=(tweets.length/10):Number(page)<= parseInt(tweets.length/10 +1))) {
        const myTweets = tweets.filter((t, i) => (i >= tweets.length - (10*page)) && (i<tweets.length - (10*(page-1))) ? t : '')
        return res.send(myTweets)
    }
    res.status(400).send("Informe uma página válida!")
})

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params
    res.send(tweets.filter((t) => t.username === username))
})


const PORT = 5000
app.listen(PORT, () => console.log(`App funcionando na porta ${PORT}`))