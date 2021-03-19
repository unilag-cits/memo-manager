// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Memo = require("../model/Memo");
const auth = require("../middleware/auth");
const multer = require("multer");
// const path = require("path");

let Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

const uploads = multer({ storage: Storage }).single('file');

router.get("/memo", auth, async (req, res) => {
  // const memo = await Memo.find({ _id: req.memo._id });
  // console.log(req);
  try {
    const memo = await Memo.find();
    if (!memo) throw Error("No items");

    res.status(200).json(memo);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/memo", auth, (req, res) => {
  uploads(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    const { memoTo, memoFrom, memoTitle, memoRemark, date } = req.body;

    console.log(req);

    const memo = new Memo({
      memoTo: memoTo,
      memoFrom: memoFrom,
      memoTitle: memoTitle,
      memoRemark: memoRemark,
      path: req.file.path,
      date: date,
    });

    memo.save();
    res.status(200).send({ memo: memo, msg: "Memo successfully registered" });
  });
});

module.exports = router;
