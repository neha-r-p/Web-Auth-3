const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const Users = require("../users/users-model");
const secrets = require("./secrets");

router.post("/register", (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hash;

  Users.add(newUser)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error creating new user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "You shall not pass!" });
      }
    });
});

router.delete("/delete", (req, res) => {
  let { id } = req.params;

  Users.remove(id)
    .then(user => {
      if (user) {
        res.status(204).json({ message: "successfully deleted the user" });
      } else {
        res
          .status(404)
          .json({ message: "Cannot delete that which does not exist" });
      }
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: "Error removing user" });
    });
});

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "12h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
