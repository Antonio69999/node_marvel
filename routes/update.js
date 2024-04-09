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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.con.query(
    "SELECT * FROM personnages WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .send("An error occurred while querying the database");
      }

      // Query for all teams
      db.con.query("SELECT * FROM equipes", (err, equipes) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .send("An error occurred while querying the database");
        }

        // Pass the teams to the view
        res.render("update", { personnage: results[0], equipes: equipes });
      });
    }
  );
});

router.post("/:id", upload.single("photo"), (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;
  let { equipe_id } = req.body;
  const photo = req.file ? req.file.path : null;

  if (equipe_id === "") {
    equipe_id = null;
  } else {
    equipe_id = Number(equipe_id);
  }

  let query = "UPDATE personnages SET nom = ?, description = ?, equipe_id = ?";
  let data = [nom, description, equipe_id];

  if (photo) {
    query += ", photo = ?";
    data.push(photo);
  }

  query += " WHERE id = ?";
  data.push(id);

  db.con.query(query, data, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .send("An error occurred while updating the database");
    }
    res.redirect("/personnages");
  });
});

module.exports = router;
