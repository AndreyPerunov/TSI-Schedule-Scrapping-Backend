# TSI-Schedule-Scrapping-Backend

!!! This is personal project, made for only educational purposes. Please read the source code carefully and use it at your own risk. I do not take responsibility for data loss, personal information loss or other incidents.

This is Transport and Telecommunication Institute Schedule Scrapping application providing a REAST API.

This application is made to make life easier for Transport and Telecommunication Institute students.

After a request to the server, the application opens the headless browser, goes to my.tsi.lv, logs in, selects a group and goes through each day collecting data about the schedule.

## Install

npm install

## Setup

Create `.env` file and put there your my.tsi.lv login and password.

    TSI_USERNAME=<YOUR_STUDENT_CODE>
    TSI_PASSWORD=<PASSWORD>

If you want to see what is happening in the real time you can go to the file models/TSI.js and change `13` line to `browser = await puppeteer.launch({ headless: false, executablePath: executablePath() })`

## Run the app

Server will start on `http://localhost:8080/`

    npm run start

# REST API

The REST API is described below.

## Get list of Lectures

### Request

`POST /api/schedule`

body:

```
{
  "group": "<YOUR_GROUP>",
  "days": <HOW_MANY_DAYS_TO_SCAN>
}
```

### Response

```
[
    {
        "month"           // type string, format "October"
        "day"             // type number
        "year"            // type number
        "timeStart"       // type string, format "08:45"
        "timeEnd"         // type string, format "08:45"
        "room"            // type string
        "group"           // type string
        "lecturer"        // type string
        "subject"         // type string
        "typeOfTheClass"  // type string
        "comment"         // type string
    },
    ...,
    {}
]
```
