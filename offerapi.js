module.exports = function (app, db) {
    let dao = require("./offerdao")(db);

    let createOffer = function (req, res) {
        if (req.isAuthenticated()) {
            dao.createOffer(req.body, function ({ err, data }) {
                res.json(data);
            });
        }
        else
            resp.send(404);
    };
    app.post("/api/offer", createOffer);

    let getOffersByErrandId = function (req, res) {
        if (req.isAuthenticated()) {
            dao.getOffersByErrandId(req.params.id, function ({ err, data }) {
                res.json(data);
            });
        }
        else
            resp.send(404);
    };
    app.get('/api/offer/:id', getOffersByErrandId);

    let updateOffer = function (req, res) {
        if (req.isAuthenticated()) {
            dao.updateOffer(req.body, req.params.id, function ({ err, data }) {
                res.json(data);
            });
        }
        else
            resp.send(404);
    };
    app.put('/api/offer/:id', updateOffer);
}