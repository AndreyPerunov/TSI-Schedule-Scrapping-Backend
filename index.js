import express from "express"
// import router from "./router.js"

const app = express()

// app.use(express.json())

// app.use("/api", router)

// app.get("/", (req, res) => {
//   res.type("html").send(`
// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Schedule Scrapper API's</title>
//     <script>
//       function clickScheduleHandler(e) {
//         e.preventDefault();
//         navigator.clipboard.writeText("${req.protocol + "://" + req.get("host")}/api/schedule");
//       }
//     </script>
//   </head>
//   <body>
//     <h1>TSI Schedule Scrapping Backend</h1>
//     <h2>Available routes:</h2>
//     <small>Click the link to copy it.</small>
//     <ul>
//       <li>
//         POST: <a href="/" onclick="clickScheduleHandler(event)">
//           ${req.protocol + "://" + req.get("host")}/api/schedule
//         </a>
//       </li>
//     </ul>
//   </body>
// </html>
//   `)
// })

app.get("/", (req, res) => res.send("Hi"))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
