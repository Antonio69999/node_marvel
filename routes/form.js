const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
  res.render("character-create");
});

router.post("/create-character", upload.single("photo"), (req, res) => {
  const { nom, description, niveau } = req.body;
  const photo = req.file.path;

  // Insert the data into the database
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
