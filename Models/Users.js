const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        require: [true, "Please Provide Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
        select: false
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.createJwt = function (){
    return jwt.sign({ userId: this._id }, "secrectKeyPassword", { expiresIn: "100000"})
}

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("user", userSchema)