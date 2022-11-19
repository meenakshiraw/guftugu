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
  db.Group.insertMany(
    [
      { name: "Group 1" },
      { name: "group2", members: ["1", "2"] },
      { name: "group3", events: ["13", "25"] },
    ],
    (err, createdGroups) => {
      if (err) return res.status(404).json({ error: err.message });
      return res
        .status(200)
        .json({ createdGroups, createdAt: new Date().toLocaleString() });
    }
  );
};

module.exports = { index, seed };
