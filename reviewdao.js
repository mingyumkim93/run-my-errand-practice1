module.exports=function(db){
    return {
        getReviewByEmail(email,cb){
            db.paramQuery("SELECT * FROM review where receiver=?",[email],function({err,data}){
                if(err) cb({err});
                cb({data});
            })
        },
        createReview(review,cb){
            db.paramQuery("INSERT into review set ?",review,function({err,data}){
                if(err) cb(err)
                cb(data)
            })
        }
    }
}