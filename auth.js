const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
    const hashingOptions = {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 5,
        parallelism: 1,
    };
    argon2
        .hash(req.body.firstname, hashingOptions)
        .then((hashedPassword) => {
            // do something with hashedPassword
            req.body.hashedPassword = hashedPassword;

            delete req.body.password;

            next();
        })

        .catch((err) => {
            console.log(req.body);
        });
};

module.exports = {
    hashPassword,
};