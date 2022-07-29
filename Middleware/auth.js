const statusCode = require("../Errors/error-helper");
const jwt = require("jsonwebtoken");
const {createCustomError} = require("../Errors/custom-error");


module.exports = async (req, res, next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer")) throw createCustomError("Invalid Auth", statusCode.UNAUTHORISED);
    const token = header.split(' ')[1]
    const payload = jwt.verify(token, "secrectKeyPassword");
    console.log(`@@@@@@Payload`,payload)
    req.user = { userId: payload.userId }
    next();
}