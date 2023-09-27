import express from "express"
import cors from "cors"
import router from "./router.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", router)

const PORT = process.env.NODE_ENV || 8080

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
