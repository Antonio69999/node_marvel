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
  db.con.query("SELECT * FROM equipes", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred while fetching the data");
    } else {
      res.render("character-create", { teams: results });
    }
  });
});

router.post("/create-character", upload.single("photo"), (req, res) => {
  const { nom, description } = req.body;
  let { equipe_id } = req.body;
  const photo = req.file.path;

  // Check if equipe_id is an empty string
  if (equipe_id === "") {
    equipe_id = null;
  } else {
    equipe_id = Number(equipe_id);
  }

  db.con.query(
    "INSERT INTO personnages (nom, description, photo, equipe_id) VALUES (?, ?, ?, ?)",
    [nom, description, photo, equipe_id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred while inserting the data");
      } else {
        res.status(200).redirect("/personnages");
      }
    }
  );
});

module.exports = router;
