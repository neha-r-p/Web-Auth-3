const express = require("express");

const router = express.Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware")

router.get("/", restricted, (req, res) => {
    console.log("headers", req.headers)
  Users.find()
    .then(users => {
        res.status(200).json({users, loggedInUser: req.user.username})
    })
    .catch(err => {
      console.log("GET error", err);
      res.status(500).json({ message: "error retrieving users" });
    });
});

module.exports = router;
