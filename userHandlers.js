const database = require("./database");

const getUsers = (req, res) => {
    database
        .query("select firstname, lastname, email, city, language from users")
        .then(([users]) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query(
            "select firstname, lastname, email, city, language from users where id = ?",
            [id]
        )
        .then(([user]) => {
            if (user[0] != null) {
                res.status(200).json(user[0]);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const postUsers = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } =
        req.body;

    database
        .query(
            "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
            [firstname, lastname, email, city, language, hashedPassword]
        )
        .then(([result]) => {
            res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving the user");
        });
};

const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language, hashedPassword } =
        req.body;

    database
        .query(
            "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
            [firstname, lastname, email, city, language, hashedPassword, id]
        )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.status(404).send("Not Found");
            } else {
                res.sendStatus(204).send("Updated user");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error editing the user");
        });
};

const deleteUsers = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("delete from users where id = ?", [id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.status(404).send("Not Found");
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error deleting the user");
        });
};

module.exports = {
    getUsers,
    getUsersById,
    postUsers,
    updateUsers,
    deleteUsers,
};