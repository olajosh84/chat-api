const MessageModel = require("../models/Message");
const ConversationModel = require("../models/Conversation");

/** get user conversation with a user */
const fetchMessages = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const conversation = await MessageModel.find({conversationId});
        res.status(200).json(conversation);
    } catch (error) {
        res.json({err: error})
    }

}

const newMessage = async (req, res) => {
    const { conversationId, senderId, text } = req.body;
    //if(!text) return res.status(400).json({status: false, msg: "Please type a message"});
    if(!text) return res.status(400).send({status: false, msg: "Type something"});
    if(!conversationId || !senderId) return res.status(400).json({status: false, msg: "One or 2 important parameters may be missing!"})
    try {
        const message = await MessageModel.create(req.body);
        res.status(200).json({message});
    } catch (error) {
        res.status(500).json({err: error});
    }
}

const fetchLastMessageId = async (req, res) => {
   try {
        const id = await MessageModel.findOne().sort({_id: -1}).limit(1);
        res.status(200).json(id._id);
   } catch (error) {
        res.status(500).json({status: false, error: "Something went wrong"})
   }
}

module.exports = { fetchMessages, newMessage, fetchLastMessageId };