module.exports = function (db) {
    return {
        //first do get and post first
        getAll(cb) {
            db.query("SELECT * FROM errand", cb);
            //sql, cb
        },
        get(id, cb) {
            db.paramQuery("SELECT * FROM errand where id=?", [id],
                function ({ error, data }) {
                    //sql, params, cb
                    if (error) cb({ error });
                    else if (data.length) cb({ data: data[0] });
                    else cb({ data: {} });
                });
        },
        insert(errand, cb) {
            db.paramQuery("INSERT INTO errand SET ?", errand, ({ error, data }) => {
                if (error) cb({ error });
                else this.get(data.insertId, cb);
            })
        },
        update(req, id, cb) {
            db.paramQuery(`UPDATE errand SET ? where id=${id}`,[req], function ({ error, data }) {
                    cb(data);
                });
        },

        delete(id, cb) {
            db.paramQuery("DELETE from errand where id=?", id, function ({ error, data }) {
                cb(data);
            });
        }

    }
}