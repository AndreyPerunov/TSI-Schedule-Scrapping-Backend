import puppeteer from "puppeteer-core"
import chromium from "chrome-aws-lambda"
import dotenv from "dotenv"

class TSI {
  async getSchedule(group, days) {
    dotenv.config()

    let browser

    try {
      // Launch Browser
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
        headless: true
      })

      // Create Page
      const page = await browser.newPage()

      // Set Viewport
      await page.setViewport({
        width: 1320,
        height: 1080
      })

      // Go to Login Url
      const url = "https://my.tsi.lv/login"
      await page.goto(url)

      // Type Username
      await page.waitForSelector("input[name=username]")
      await page.type("input[name=username]", process.env.TSI_USERNAME, { delay: 40 })

      // Type Password
      await page.waitForSelector("input[name=password]")
      await page.type("input[name=password]", process.env.TSI_PASSWORD, { delay: 40 })

      // Submit Form
      await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation("networkidle2")])

      // Check for Form Result
      if ((await page.url()) != "https://my.tsi.lv/personal") {
        throw new Error("Failed to login")
      }

      // Go to Schedule Url
      const scheduleUrl = "https://my.tsi.lv/schedule"
      await page.goto(scheduleUrl, {
        waitUntil: "load",
        timeout: 0
      })

      // Set Group
      await page.waitForSelector('select[name="sel-group"]')
      const option = (await page.$x(`//*[@id="form1"]/div/div[1]/div[1]/select/option[text() = "${group}"]`))[0]
      const value = await (await option.getProperty("value")).jsonValue()
      await page.select('select[name="sel-group"]', value)
      await page.waitForSelector('button[name="show"]')
      await page.click('button[name="show"]')

      // Switch to Day View
      await Promise.all([page.click('button[name="day"]'), page.waitForNavigation("networkidle2")])

      // Go Through Each Day
      let result = []
      for (let i = 0; i < days; i++) {
        // Get Array of All Day Lectures
        const daySchedule = await page.$$eval(".wide-screen table tbody tr", rows => {
          return Array.from(rows, row => {
            const columns = row.querySelectorAll("td")
            return Array.from(columns, column => column.innerText)
          })
        })

        // Get The Date
        const date = await page.$$eval(".col-lg-6.form-row p", elems => {
          return Array.from(elems, elem => elem.innerText)[0]
        })

        // Format Array and Date
        result = result.concat(this.#convertArrayToObject(daySchedule, date))

        // Go To The Next Day
        await Promise.all([page.click('button[name="next"]'), page.waitForNavigation("networkidle2")])
      }

      return result
    } catch (error) {
      console.log(error)
      throw new Error("\nError: ", error)
    } finally {
      await browser?.close()
    }
  }

  #convertArrayToObject(inputArray, date) {
    const result = []
    // date = Friday, September 15, 2023
    const dateParts = date.split(", ") // datePartes = ["Friday","September 15","2023"]

    const dayMonthYear = dateParts[1].split(" ") // dayMonthYear = ["September","15"]
    const month = dayMonthYear[0]
    const day = parseInt(dayMonthYear[1])
    const year = parseInt(dateParts[2])

    inputArray.forEach(element => {
      if (element[1].trim() !== "") {
        const classInfo = {
          month: month,
          day: day,
          year: year,
          timeStart: element[1].split(" - ")[0],
          timeEnd: element[1].split(" - ")[1],
          room: element[2],
          group: element[3],
          lecturer: element[4],
          subject: element[5],
          typeOfTheClass: element[6],
          comment: element[7]
        }

        result.push(classInfo)
      }
    })

    return result
  }
}

export default new TSI()
