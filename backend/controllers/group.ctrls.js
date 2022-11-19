const db = require("../models");

const index = (req, res) => {
  db.Group.find({}, (error, group) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      group,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const seed = (req, res) => {
  db.Group.create(req.body, (err, createdGroup) => {
    if (err) return res.status(404).json({ error: err.message });
    return res
      .status(200)
      .json({ createdGroup, createdAt: new Date().toLocaleString() });
  });
};

module.exports = { index, seed };
