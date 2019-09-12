module.exports = function (app, db, bcrypt) {

    let dao = require("./userdao")(db);
    dao.getAllUsers(function ({ error, data }) {
        users = data;
    });

    app.get('/api/user/:email', function (req, res) {
        if(req.isAuthenticated()){
            dao.getUserByEmail(req.params.email, function ({ err, data }) {
                delete data[0].password;
                res.json(data[0]);
            })
        }
        else
            res.sendStatus(404);
    });

    app.put('/api/user/:email', function (req, res) {
        if(req.isAuthenticate()){
            let saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) res.send(err);
                req.body.password = hash;
                dao.updateUser(req.body, function ({ err, data }) {
                    if (err) res.send(err)
                    res.sendStatus(200);
                })
            })
        }
        else
            res.sendStatus(404);
       
    })

    app.post("/api/user", (req, res) => {
        dao.getUserByEmail(req.body.email, function ({ err, data }) {
            if (err) res.send(err);
            if (data[0]) res.send(404);
            else {
                let saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) res.send(err);
                    req.body.password = hash
                    dao.createUser(req.body, function ({ err, data }) {
                        if (err) res.send(err)
                        res.sendStatus(200);
                    });
                });
            }
        })
    });

    app.get("/logout", (req, res) => {
        if (req.session){
            req.logout();
            res.sendStatus(200);
        }
    })

    app.get("/isAuthenticated", (req,res)=>{

        if(req.isAuthenticated()){
            dao.getUserById(req.session.passport.user, function({err,data}){
                if(err)
                    send(err)
                delete data[0].password;
                res.json(data[0]);
                console.log("authenticated")
            })
        }
        else{
            res.status(401).send("Not found")
            console.log("not auth")
        }
    });
    app.get("/isUnauthenticated", (req,res)=>{
        if(req.isUnauthenticated()){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    })
}
