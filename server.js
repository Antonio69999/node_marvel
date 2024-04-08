const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const db = require("./database");

// db.connect()
//   .then(() => {
//     console.log("Database connected");
//     app.listen(3000, () => console.log("Server is running on port 3000"));
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error);
//   });
/**
 * Configuration de mustache
 * comme moteur de template
 * pour l'extension .mustache
 */
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

/**
 * Configuration de express
 * pour récupérer les données d'un formulaire
 * et pour servir les fichiers statiques
 * (css, js, images, etc.)
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const persoRouter = require("./routes/personnages");

app.get("/", (req, res) => {
  res.send("Welcome On My App!");
});

app.use("/personnages", persoRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
