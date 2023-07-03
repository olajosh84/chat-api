const UserModel = require("../models/User");

const fetchUsers = async (req, res) => {
    /**PS: make sure only admin can access this route */
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.json({err: error})
    }
}

const fetchUser = async (req, res) => {
    const { userId } = req.user;
    try{
        const user = await UserModel.findOne({_id: userId});
        if(!user) return res.status(400).json({status: false, msg: 'User does not exist'});
        res.status(200).json({user});
    } catch(error){
        res.json({err: error})
    }
}

const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, profileImg } = req.body;
    if(!firstName || !lastName) return res.status(400).json({status: false, msg: "All form fields are compulsory"});
    try {
        const user = await UserModel.findOneAndUpdate({_id: userId}, req.body, { new: true, runValidators: true});
        res.status(201).json({status: true, msg: "Profile updated successfully"})
        //res.status(201).json({user});
    } catch (error) {
        res.json({status: false, msg: "Something went wrong"});
    }
    
}

const deleteUser = async (req, res) => {
    /**PS: make sure only admin can access this route */
    const { userId } = req.query;
    try {
        const user = await UserModel.findOneAndDelete({_id: userId});
        if(!user) return res.status(400).json({status: false, msg: 'User does not exist'});
        res.status(200).json({status: true, msg: "User deleted successfully"});
    } catch (error) {
        res.json({err: error});
    }
}

//fetch receiver info
const fetchReceiverInfo = async (req, res) => {
    const { receiver } = req.params;
    try {
        const user = await UserModel.findOne({_id: receiver});
        if(!user) return res.status(400).json({status: false, msg: "User does not exist"});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({status: false, msg: "Something went wrong"})
    }
    
    /*const { receiver } = req.params;
    const { search } = req.query;
    try {
        let user;
        if(search){
            user = await UserModel.findOne({_id: receiver, username: { $regex: `${search}`} });
        }
        user = await UserModel.findOne({_id: receiver});
        //if(!user) return res.status(400).json({status: false, msg: "User does not exist"});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({status: false, msg: "Something went wrong"})
    }*/
    
}

module.exports = {
    fetchUsers,
    fetchUser,
    updateProfile,
    deleteUser,
    fetchReceiverInfo
}