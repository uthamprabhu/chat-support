import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send("Hello")
    console.log("Hello world")
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})