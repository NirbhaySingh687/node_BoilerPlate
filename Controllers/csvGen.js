const {errorResponse, successResponse} = require("../Helper/helper");
const {successMessages} = require("../Helper/message");
const fs = require('fs');


export function arrToObjectData(arrHeader, arrBody) {
    return arrHeader.reduce((prevValue, curValue, curIndex, arr) => {
        return { ...prevValue, [curValue]: arrBody[curIndex] ? arrBody[curIndex].replace(/[\r\n]/gm, '').trim(): ''};
    }, {});
}
const csvGen = async (req, res, next) => {
    try{
        const param = { ...req.body, ...req.query, ...req.param }
        //const file = req.files
        //const userDataReadStream = fs.createReadStream(`${process.cwd()}/${file.path}`);
        const userDataReadStream = fs.createReadStream(`${process.cwd()}/uploads/1698293718152-Untitled spreadsheet - Sheet1.csv`);
        let rawData = ``;
        userDataReadStream.on("data", (data) => {
            rawData += data;
        });
        const userData = [];
        await userDataReadStream.on("end", () => {
            const arrayData = rawData.split("\n");
            const [stringHeadData, ...arrayBodyData] = arrayData;
            //stringHeadData will be like  'firstName,lastName,email,isActiveMembership,lastBillingDate
            //arrayBodyData will be like  ['Nirbhay,Singh,n@gmail.com,TRUE,09/12/2022\r', 'Sakshi,Babbar,s@gmail.com,FALSE,10/10/2023'
            const arrayHeadData = stringHeadData.split(",");
            const bodyData = arrayBodyData.map((body) =>  body.split(","));
            console.log(bodyData);
            console.log(arrayHeadData);

            for (let i = 0; i < bodyData.length; i++) {
                userData.push(arrToObjectData(arrayHeadData, bodyData[i]));
            }
        });
        console.table(userData);
        return successResponse(req, res,userData, successMessages.OPERATION_COMPLETED)
    } catch (err) {
        return errorResponse(req, res)
    }
}

module.exports = {
    csvGen
}