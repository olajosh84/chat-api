const UserModel = require('../models/User');
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        /** validate user inputs 
         * first check if there are empty fields
         * then check if username and password are not less than 4 characters
         * then check if username does not excedd 15 characters
         * then check if email entered by user is valid
         * then check if username or email exists in the database
        */
        
        if(!username || !email || !password){
            return res.status(400).json({status: false, msg: "All form fields are compulsory"});
        }else {
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(username.length < 4) return res.status(400).json({status: false, msg: "Username must be at least 4 characters long"});
            if(username.length > 15) return res.status(400).json({status: false, msg: "Username must not exceed 15 characters"});
            //if(username.startsWith(Number)) return res.status(400).json({status: false, msg: "Username must begin with a letter"})
            if(!email.match(mailformat)) return res.status(400).json({status: false, msg: "Please provide a valid email address"});
            if(password.length < 4) return res.status(400).json({status: false, msg: "Password must be at least 4 characters long"});
            if(password !== confirmPassword) return res.status(400).json({status: false, msg: "Passwords do not match"});
        }
        /** check for uniqueness of username and email before saving in the db */
        const userExist = await UserModel.findOne({username});
        if(userExist) return res.status(400).json({status: false, msg: `Sorry, username '${userExist.username}' is taken`});
        const emailExist = await UserModel.findOne({email});
        if(emailExist) return res.status(400).json({status: false, msg: `Sorry, email '${emailExist.email}' already exists`});
        const user = await UserModel.create(req.body);
        res.status(201).json({ status: true, msg: "Registration successful"});
    } catch (error) {
        res.status(500).json({status: false, msg:"Oops! Something went wrong. Please try again later"});
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        if(!username || !password){
            return res.status(400).json({status: false, msg: "All form fields are compulsory"});
        }
        const user = await UserModel.findOne({ username });
        if(!user) return res.status(400).json({status: false, msg: "Username does not exist"});
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return res.status(400).json({status: false, msg: "Password is not correct"});
        //get token
        const token = await user.createJWT();
        res.status(201).json({status: true, msg: "Login successful", token});
    } catch (error) {
        res.status(500).json({status: false, msg: "Oops! Something went wrong. Please try again later"});
    }
}

const verifyUser = async (req, res) => {
    const { email } = req.body;
    const { username } = req.params;
    try {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email) return res.status(400).json({status: false, msg: "Please enter your email address"});
        if(!email.match(mailformat)) return res.status(400).json({status:false, msg: "Please enter a valid email address"});
        const user = await UserModel.findOne({email, username});
        if(!user) return res.status(404).json({status:false, msg: "User does not exist"});
        res.status(201).json({status: true, userId: user._id, msg: "User verified"});
    } catch (error) {
        res.status(500).json({status: false, msg: "Oops! Something went wrong. Please try again later"});
    }
}

const passwordReset = async (req, res) => {
    const { userId } = req.params;
    const { password, confirmPassword } = req.body;
    if(!password || !confirmPassword) return res.status(400).json({status: false, msg: "All form fields are compulsory"})
    if(password.length < 4) return res.status(400).json({status: false, msg: "Password must be at least 4 characters long"});
    if(password !== confirmPassword) return res.status(400).json({status: false, msg: "Passwords do not match"});
    //hasing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.findOneAndUpdate({_id: userId}, { password: hashPassword }, {new: true, runValidators: true});
    res.status(201).json({status: true,  user, msg: "Password Reset successful"});
    try {
        const user = await UserModel.find
    } catch (error) {
        res.status(500).json({status: false, msg: "Oops! Something went wrong. Please try again later"});
    }
}


module.exports = { register, login, verifyUser, passwordReset };