const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

router.post("/register", ctrls.user.register);

router.post("/signin", ctrls.user.signIn);

router.post("/", ctrls.user.checkUser);

module.exports = router;
