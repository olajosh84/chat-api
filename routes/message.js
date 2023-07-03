const router = require("express").Router();
const { fetchMessages, newMessage, fetchLastMessageId } = require("../controllers/message");

router.route('/lastId').get(fetchLastMessageId);
router.route('/:conversationId').get(fetchMessages);
router.route("/").post(newMessage);

module.exports = router;