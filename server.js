const express = require("express")
const app = express()
const mongoose = require("mongoose")
const livro = require("./schemas/livro")
const cors = require("cors")

require ("dotenv").config()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_KEY)

    .then(() => {
        console.log("conectou ao banco com sucesso!")

        app.listen(3000, () =>{
            console.log("Servidor ligado no http://localhost:3000")
        })
    })

    .catch((err) => console.log(err))

app.post("/livro", async (req, res) =>{
    const{titulo, autor, valor} = (req.body)
        const novoLivro ={
            titulo,
            autor,
            valor

        }
    try{
        await livro.create(novoLivro)
        console.log("Livro adicionado ao banco com sucesso")
    }
    catch(error){
        res.send(error)
    }
})

app.get("/livros", async (req, res) => {
    try{
        const livros = await livro.find()
        res.json(livros)
    }
    catch(error){
        res.send(error)
    }
})