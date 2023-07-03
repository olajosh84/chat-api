const router = require("express").Router();
const { fetchConversations, fetchConversation, newConversation, fetchLastConversationId, updateConversation } = require("../controllers/conversation");

router.route("/fetchConversations").get(fetchConversations);
router.route('/fetchConversation').get(fetchConversation);
router.route("/").post(newConversation);
router.route('/lastId').get(fetchLastConversationId);
router.route('/updateConversation').patch(updateConversation);

module.exports = router;