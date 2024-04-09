const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.con.query("SELECT * FROM equipes", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred while fetching the data");
    } else {
      res.render("equipe", { equipe: results });
    }
  });
});

router.get("/:id", (req, res) => {
  db.con.query(
    "SELECT * FROM personnages WHERE equipe_id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching the data");
      } else {
        res.render("personnages", { personnages: results });
      }
    }
  );
});

module.exports = router;
