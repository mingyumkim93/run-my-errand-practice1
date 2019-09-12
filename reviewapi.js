
module.exports = function (app, db) {

    let dao = require("./reviewdao")(db);

    let createReview = function (req, res) {
        if (req.isAuthenticated()) {
            dao.createReview(req.body, function ({ err, data }) {
                if (err) res.send(err);
                res.json(data);
            });
        }
        else
            res.send(404);
    };
    app.post("/api/review", createReview);

    let getReviewByEmail = function (req, res) {
        if (req.isAuthenticated()) {
            dao.getReviewByEmail(req.params.email, function ({ err, data }) {
                if (err) res.send(err);
                res.json(data);
            });
        }
        else
            resp.send(404);
    };
    app.get("/api/review/:email", getReviewByEmail);
}
