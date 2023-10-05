import express from "express"
import cors from "cors"
import router from "./router.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", router)

app.get("/", (req, res) => {
  res.send(`
  <script type="text/javascript">
  function clickScheduleHandler(e) {
    e.preventDefault(); 
    navigator.clipboard.writeText("${req.protocol + "://" + req.get("host")}/api/schedule");
  }
  </script>
  <h1>TSI Schedule Scrapping Backend</h1>
  <h2>Available routes:</h2>
  <small>Click the link to copy it.</small>
  <ul>
    <li>
      POST: <a href="/" onclick="clickScheduleHandler(event)">
        ${req.protocol + "://" + req.get("host")}/api/schedule
      </a>
    </li>
  </ul>
  `)
})

const PORT = process.env.NODE_ENV || 8080

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
