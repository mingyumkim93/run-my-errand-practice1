module.exports=function(db){
    return{
        createOffer(offer,cb){
            db.paramQuery("INSERT into offer set ?",offer,function({err,data}){
                if(err) cb(err)
                cb(data)
            })
        },

        getOffersByErrandId(errandId,cb){
            db.paramQuery("select * from offer where errand_id=?",[errandId],function({err,data}){
                if(err) cb(err)
                cb({data})
            })
        },

        updateOffer(updatedOffer,id,cb){
            db.paramQuery(`update offer set ? where id=${id}`,updatedOffer,function({err,data}){
                if(err) cb(err)
                cb({data})
            })
        }
    }
}