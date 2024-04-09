const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/:id", (req, res) => {
  const { id } = req.params;
  db.con.query("DELETE FROM personnages WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .send("An error occurred while deleting the character");
    }

    res.redirect("/personnages");
  });
});

module.exports = router;
