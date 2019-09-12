module.exports = function (app, db, passport, LocalStrategy, bcrypt) {

    let dao = require("./userdao")(db);
    passport.serializeUser(function (user, done) {
        console.log(user);
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        console.log(id);
        dao.getUserById(id, function ({ error, data }) {
            if (error) console.log("Error happened on querying an user")
            console.log("data[0] in deserializeUser " + data[0])
            done(null, data[0])
        });
    });
    passport.use(new LocalStrategy({
        usernameField: 'emailInput',
        passwordField: 'passwordInput'
    },
        function (username, password, done) {

            dao.getUserByEmail(username, function ({ error, data }) {
                if (error) return done(error);
                if (!data[0]) {
                    console.log("Incorrect email!");
                    return done(null, false, { message: 'Incorrect email.' })
                }
                bcrypt.compare(password, data[0].password, function (err, result) {
                    if (result == true) {
                        console.log("all clear")
                        return done(null, data[0])
                    }
                    else {
                        //console.log("Incorrect password!");
                        return done(null, false, { message: 'Incorrect password.' })
                    }
                }
                )
            })
        }
    ));

    app.post('/login',
        passport.authenticate('local'), function (req, res) {
            console.log("authentication is done successfully");
            res.redirect("/errands-list")
        });

}
