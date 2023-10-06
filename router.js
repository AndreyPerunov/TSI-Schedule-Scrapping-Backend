import Router from "express"
import TSIController from "./controllers/TSIController.js"
import cors from "cors"

const router = Router()

router.use(cors())

router.post("/schedule", TSIController.getSchedule)

export default router
