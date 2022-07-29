const express = require("express")
const morgan = require("morgan")
const http = require('http');
require("dotenv").config()
const app = express();
const PORT = 5000;
const taskRoutes = require("./Routes/task")
const userRoutes = require("./Routes/User")
const errorHandler = require("./Middleware/errorHandler")
const notFound = require("./Middleware/notFound")
const dbConn = require("./Connection/db.connect")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))


app.get("/hello", (req, res)=> {
    throw new Error("Error Creating In first attempt")
})

app.use("/api/v1/tasks", taskRoutes)
app.use("/api/v1/auth", userRoutes)
app.use(notFound)
app.use(errorHandler)

dbConn.connectDb()
app.listen(PORT, ()=> {
    console.log(`Server is up and Running on Port ${PORT}`)
})
