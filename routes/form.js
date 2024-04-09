const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("character-create");
});

router.post("/create-character", upload.single("photo"), (req, res) => {
  const { nom, description } = req.body;
  const photo = req.file.path;

  db.con.query(
    "INSERT INTO personnages (nom, description, photo) VALUES (?, ?, ?)",
    [nom, description, photo],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred while inserting the data");
      } else {
        res.status(200).send("Data inserted successfully");
      }
    }
  );
});

module.exports = router;
