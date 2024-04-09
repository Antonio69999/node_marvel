const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const db = require("./database");

app.use("/uploads", express.static("uploads"));

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
const createRouter = require("./routes/form");
const updateRouter = require("./routes/update");
const deleteRouter = require("./routes/delete");
const teamRouter = require("./routes/equipes");
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/personnages", persoRouter);
app.use("/create", createRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);
app.use("/equipes", teamRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
