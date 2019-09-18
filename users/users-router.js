const express = require("express");

const router = express.Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
      console.log("GET error", err);
      res.status(500).json({ message: "error retrieving users" });
    });
});

module.exports = router;
