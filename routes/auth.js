const router = require("express").Router();
//auth controllers
const { register, login, verifyUser, passwordReset } = require("../controllers/auth");

//routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route('/verifyUser/:username').post(verifyUser);
router.route('/passwordReset/:userId').patch(passwordReset);

module.exports = router;
