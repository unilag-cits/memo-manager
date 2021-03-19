const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../model/User");
const auth = require("../middleware/auth");

router.get("/loadUser", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-Hashed_Password -salt"
  );
  res.send(user);
});

router.post("/signup", async (req, res) => {
  // console.log(req.body);
  await User.findOne({ staffId: req.body.staffId }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        msg: "staffId already exist",
      });
    }
    const { staffId, password } = req.body;
    user = new User({ staffId, password });

    user.save();
    // const token = user.generateAuthToken();
    // res.header("x-auth-token", token).json({
    //   user: { staffId },
    //   // token,
    //   msg: "Signup success! Please signin.",
    // });
    res
      .status(200)
      .send({ user: staffId, msg: "Signup success! Please signin." });
  });
});

router.post("/signin", (req, res) => {
  // console.log(req.body);
  const { staffId, password } = req.body;
  User.findOne({ staffId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        msg: "User with that staffId does not exist. Please signup.",
      });
    }

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        msg: "staffId and Password do not match.",
      });
    }

    // generate token
    const token = user.generateAuthToken();
    const { username, email, role } = user;
    res
      .header("x-auth-token", token)
      .json({ user: { username, email, role }, token, msg: "success" });
  });
});

module.exports = router;
