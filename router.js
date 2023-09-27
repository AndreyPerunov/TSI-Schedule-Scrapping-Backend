import Router from "express"
import TSIController from "./controllers/TSIController.js"

const router = Router()

router.post("/schedule", TSIController.getSchedule)

export default router
