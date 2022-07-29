import User from "../Models/Users"
import { createCustomError } from "../Errors/custom-error"
import statusCode from "../Errors/error-helper"

exports.register = async(req,res, next)=>{
    const param = { ...req.body, ...req.query, ...req.params }
    const { name, email, password } = param
    if(!name || !email || !password) throw createCustomError("Please Provide Valid Data", statusCode.BAD_REQUEST)
    const findUser = await User.findOne({ email }).lean();
    if(findUser){
        throw createCustomError("Profile is already Exists", statusCode.UNAUTHORISED)
    }
    const user = await User.create(param);
    const data = await User.findOne({ email }).select({ name: 1, email: 1 })
    const token =user.createJwt()
    res.status(statusCode.OK).json({ msg: "register successfully Routes", data, token})
}

exports.login = async (req, res) => {
    const param = { ...req.body, ...req.query, ...req.params };
    const { password, email } = param;
    if(!password || !email) throw createCustomError("Invalid parameters", statusCode.BAD_REQUEST)
    const user = await User.findOne({email}).select("+password")
    if(!user) throw createCustomError("Profile not found", statusCode.UNAUTHORISED);
    const isPassword =await user.comparePassword(password)
    if(!isPassword) throw createCustomError("Wrong Password", statusCode.UNAUTHORISED)
    const token = user.createJwt();
    const data = await User.findOne({ email }).select({ name: 1, email: 1 })
    res.status(statusCode.OK).json({ msg: "Login Successfully done", token, data})
}

exports.getProfile = async (req, res) => {
    const param = { ...req.body, ...req.query, ...req.params };
    const { id } = param;
    const getProfile = await User.findById(id).select({ email: 1, name: 1 }).lean()
    if(!getProfile) throw createCustomError("Profile not found", statusCode.UNAUTHORISED);
    res.status(statusCode.OK).json({ msg: "Profile Found", data: getProfile })
}
