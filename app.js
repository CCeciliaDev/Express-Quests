require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { validateMovie } = require("./validator");
const { validateUser } = require("./validator");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

///// ---------- ROUTES PUBLIQUE ---------- /////
// Les routes publiques pour movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
///// Les routes publiques pour users
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
///// Route REGISTER
app.post("/api/users", validateUser, hashPassword, userHandlers.postUsers);
// Route LOGIN
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

// ---------- MUR D'AUTHENTIFICATION pour les routes privées ci-dessous ---------- //
app.use(verifyToken);

///// ---------- ROUTES PRIVÉES ---------- /////
///// Les routes privées pour movies
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
///// Les routes privées pour users
app.put("/api/users/:id", validateUser, hashPassword, userHandlers.updateUsers);
app.delete("/api/users/:id", userHandlers.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});