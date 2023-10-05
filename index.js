import express from "express"
import cors from "cors"
import router from "./router.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", router)

app.get("/", (req, res) => {
  res.send(`
  <h1>TSI Schedule Scrapping Backend</h1>
  <h2>Available routes:</h2>
  <ul>
    <li>
      POST: <a href="${req.protocol + "://" + req.get("host")}/api/schedule">${req.protocol + "://" + req.get("host")}/api/schedule</a>
    </li>
  </ul>
  `)
})

const PORT = process.env.NODE_ENV || 8080

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
