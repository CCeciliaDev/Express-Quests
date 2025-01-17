const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];


const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


const getUsers = (req, res) => {
  database.query("select * from users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};


const getUsersByID = (req, res) => {
  const id = parseInt(req.params.id);
  database  
  .query("select * from users where id = ?", [id])
  .then(([users]) => {
    if (users[0] != null) {
      res.json(users);
      } else {
        res.status(404).send("Not Found")
      }
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};


const postMovies = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};


const postUsers = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
  database
  .query(
    "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
  [firstname, lastname, email, city, language]
).then(([result]) => {
res.location(`/api/users${result.insertId}`).send(201);
})
.catch((err)=> {
  console.error(err);
  res.status(500).send("Error")
})
};


const putMovieById = (req, res) =>{
  const id = parseInt(req.params.id);
  const {title, director, year, color, duration} = req.body;
  database.query(
    "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
    [title, director, year, color, duration, id]
  ).then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error editing the movie")
  })
}


const putUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, language} = req.body;
  database.query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
    [firstname, lastname, email, city, language, id]
  ).then(([result]) => {
    if(result.affectedRows === 0){
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error editing the user')
  })
}


const deleteMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database.query(
    "DELETE FROM movies WHERE id = ?",
    [id]
  ).then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found")
    } else {
      res.sendStatus(204)
    }
  }).catch((err)=> {
    console.error(err);
    res.status(500).send("Error delete the movie")
  })
}


const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  ).then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found")
    } else {
      res.sendStatus(204)
    }
  }).catch((err)=> {
    console.error(err);
    res.status(500).send("Error delete the user")
  })
}

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUsersByID,
  postMovies,
  postUsers,
  putMovieById,
  putUserById,
  deleteMovieById,
  deleteUserById,
};