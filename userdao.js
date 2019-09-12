module.exports=function(db){
    return {
        getAllUsers(cb){
            db.query("SELECT * FROM user",cb);
                    //sql, cb
        },

        getUserByEmail(email, cb){
            db.paramQuery("SELECT * FROM user where email = ?", [email],function({error, data}){
                if (error) cb({error});
                else cb({data});
            });
        },
        getUserById(id, cb){
            db.paramQuery("SELECT * FROM user where id = ?", [id],function({error, data}){
                if (error) cb({error});
                else cb({data});
            });
        },
        createUser(user, cb){
            db.paramQuery("INSERT INTO user SET ?",user,function({error,data}){
                if(error) cb({error});
                else cb({data});
            })
        },
        updateUser(user, cb){
            db.paramQuery(`UPDATE user SET ? where id=${user.id}`,[user],function({err,data}){
                cb({data});
            })
        }
    }
}
