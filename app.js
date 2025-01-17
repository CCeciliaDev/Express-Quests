require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersByID);
// app.post("/api/movies", movieHandlers.postMovies);
// app.post("/api/users", movieHandlers.postUsers);
// app.put("/api/movies/:id", movieHandlers.putMovieById);
// app.put("/api/users/:id", movieHandlers.putUserById);
app.delete("/api/movies/:id", movieHandlers.deleteMovieById);
app.delete("/api/users/:id", movieHandlers.deleteUserById);

///// Quete Valider la saisi utilisateur /////
const { validateMovie, validateUser } = require("./validator.js");
app.post("/api/movies",validateMovie, movieHandlers.postMovies);
app.post("/api/users",validateUser, movieHandlers.postUsers);
app.put("/api/movies/:id",validateMovie, movieHandlers.putMovieById);
app.put("/api/users/:id",validateUser, movieHandlers.putUserById);
//////////


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
