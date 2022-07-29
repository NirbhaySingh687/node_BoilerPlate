const { createCustomError } = require("../Errors/custom-error")
const loggers = require("../Logger")

async function craete(){
    console.log(`##I am Here## craete`)
    if(true){
        await craete1()
    }
    return  1;
}


async function craete1(){
    console.log(`##I am Here##craete1`)
    if(true){

        loggers.warn("This is warning message");
        loggers.error("This is just a error message")
        loggers.error(`Process ${process.env.NODE_ENV}`)
        throw createCustomError("Inbuilt Method to call Error from craete1 proper", 400)
    }
    return  2;
}


const getTasks = async (req, res, next) => {
    const a = 2;
    if(a === 1){
        throw new Error("Creating new Error on getTasks")
    }else if(a === 2){
        const data = await craete()
        console.log('data',data)
    }
    res.send("Get all Task from single file")
}

const createTasks = (req, res) => {
    res.send("Create new Tasks from this file")
}

const getSingleTask = (req, res) => {
    res.send("Get all Single Task from this pannel")
}

const updateTask = (req, res) =>{
    res.send("update the tas")
}

const deleteTasks = (req, res) => {
    res.send("delete Task")
}

module.exports = {
    getTasks,
    createTasks,
    getSingleTask,
    updateTask,
    deleteTasks
}