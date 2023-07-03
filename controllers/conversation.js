const ConversationModel = require("../models/Conversation");

 /**  get all active conversations of a user in descending order using the latest message(i.e message id) **/
 const fetchConversations = async (req, res) => {
    const { userId } = req.query;
    try {
      const userConversations = await ConversationModel.find({
         members: { $in: [userId] }
      }).sort({messageId: -1});
      res.status(200).json(userConversations);
    } catch (error) {
      res.status(500).json({err: error})
    }
 }

 const fetchConversation = async (req, res) => {
  /*const lastID = await ConversationModel.findOne().sort({_id: -1}).limit(1)
  res.json({id: lastID})*/
  /*const { userId } = req.query;
  try {
    const userConversation = await ConversationModel.find({
       members: { $in: [userId] }
    });
    res.status(200).json(userConversation);
  } catch (error) {
    res.status(500).json({err: error})
  }*/
 }

 const newConversation = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
      const conversation = await ConversationModel.create({
         members: [senderId, receiverId]
       })
   
       res.status(200).json({conversation});
    } catch (error) {
      res.status(500).json({err: error})
    }
   
 }
 const fetchLastConversationId = async (req, res) => {
    try {
      const id = await ConversationModel.findOne().sort({_id: -1}).limit(1);
      res.status(200).json(id._id);
    } catch (error) {
      console.error(error);  
    }
 }

 const updateConversation = async (req, res) => {
    const {conversationId, messageId} = req.query;
    try {
      const updatedConversation = await ConversationModel.findOneAndUpdate({_id: conversationId}, {messageId}, {new: true, runValidators: true});
      res.status(200).json(updatedConversation);
    } catch (error) {
      res.status(500).json({status: false, msg: "Something went wrong"});
    }
 }

 module.exports = 
 { 
  fetchConversations, newConversation, 
  fetchConversation, fetchLastConversationId,
  updateConversation 
};