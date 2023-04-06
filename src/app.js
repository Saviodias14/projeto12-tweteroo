import express from "express"
import cors from "cors"

const users = []
const app = express()

app.use(express.json())

app.post("/sign-up",(req,res)=>{
    const {username, avatar} = req.body
    console.log(req.body)
    if(!username||!avatar){
        return res.status(422).send("Todos os campos devem estar preenchidos corretamente")
    }
    users.push({username, avatar})
    res.send("ok")
})

const PORT = 5000
app.listen(PORT, () => console.log(`App funcionando na porta ${PORT}`))