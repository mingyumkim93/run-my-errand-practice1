module.exports = function (app, db) {
    let dao = require("./erranddao")(db);
    let getAllErrands = function (req, resp) {
        if (req.isAuthenticated()) {
            dao.getAll(function ({ error, data }) {
                resp.json(data);
            });
        }
        else
            resp.sendStatus(404);
    };
    app.get("/api/errands", getAllErrands);

    let getErrand = function (req, resp) {
        if (req.isAuthenticated()) {
            let id = Number(req.params.id);
            dao.get(id, function ({ error, data }) {
                resp.json(data);
            });
        }
        else
            resp.sendStatus(404);
    };
    app.get("/api/errands/:id", getErrand);

    let postErrand = function (req, resp) {
        if (req.isAuthenticated()) {
            dao.insert(req.body, function ({ error, data }) {
                resp.json(data);
            });
        }
        else
            resp.sendStatus(404);
    };
    app.post("/api/errands", postErrand);

    let updataErrand = function (req, resp) {
        if (req.isAuthenticated()) {
            dao.update(req.body, req.params.id, function ({ error, data }) {
                resp.json(data);
            });
        }
        else
            resp.sendStatus(404);
    };
    app.put("/api/errands/:id", updataErrand);

    let deleteErrand = function (req, resp) {
        if (req.isAuthenticated()) {
            dao.delete(req.params.id, function ({ error, data }) {
                resp.json(data);
            });
        }
        else
            resp.sendStatus(404);
    };
    app.delete("/api/errands/:id", deleteErrand);

    
    //TODO : add get user by errandId
}