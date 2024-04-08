const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.con.query("SELECT * FROM `personnages`", (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .send("An error occurred while querying the database");
    }
    console.log(results[0]);
    res.render("personnages", { personnages: results });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.con.query(
    "SELECT * FROM `personnages` WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .send("An error occurred while querying the database");
      }
      if (results.length > 0) {
        res.render("personnage", { personnage: results[0] });
      } else {
        res.status(404).send("Character not found");
      }
    }
  );
});

module.exports = router;
