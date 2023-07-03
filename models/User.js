const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Please provide your username"],
        minlength: [4, "Username must be at least 4 characters long"],
        maxlength: [15, "Username must not be more than 15 characters"],
        unique: [true, "Username already exists in our database"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Please provide your password"],
        minlength: [4, "Password must be at least 4 characters long"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email address"],
        unique: [true, "Email already exists"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"],
    },
    
    profileImg: String,
    role: String

}, { timestamps: true });

/** hash password before saving.PS: the next() argument is not compulsory */
UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
/** convert username to  lowercase and remove any space*/
/*UserSchema.pre("save", async (next) => {
    this.username = await this.username.split(" ").join("");
    next();
})*/
/** create or sign a web token after login using instance methods */
UserSchema.methods.createJWT = async function (){
    const token = await jwt.sign(
        {
            userId: this._id, 
            username: this.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
        }
    );
    return token;
}


module.exports = mongoose.model('User', UserSchema);