const router = require("express").Router();
const { fetchUsers, fetchUser, updateProfile, deleteUser, fetchReceiverInfo } = require("../controllers/user");
const authenticateUser = require('../middlewares/authenticate-user');

router.route("/").get(fetchUsers);
router.route("/fetchUser").get(authenticateUser,fetchUser);
router.route('/:userId').patch(updateProfile).delete(deleteUser);
router.route('/fetchReceiver/:receiver').get(fetchReceiverInfo);
//testing route
//router.route("/fetchReceiverInfo/:receiver").get(fetchReceiverInfo);

module.exports = router;