const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

// SEED route to make some junk data
router.get("/groupSeed", ctrls.groups.seed);

// GET route to show index of all
router.get("/group", ctrls.groups.index);

module.exports = router;
