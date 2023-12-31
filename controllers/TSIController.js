import TSI from "../models/TSI.js"

class TSIController {
  async getSchedule(req, res) {
    try {
      console.log("/api/schedule")
      const schedule = await TSI.getSchedule(req.body.group, req.body.days)
      res.json(schedule)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new TSIController()
