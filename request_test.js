
let db=require('./mysqlhelper');
let dao=require('./requestdao')(db);

dao.insert({lastName:'KyrÃ¶',firstName:'Tuomas'},function({data,error}){
    console.log(data)
})

/*
dao.get(1,function({error,data}){
    console.log(data);
})
*/
/*
db.query("SELECT * FROM author",function({error,data}){
    console.log(data);
});


db.paramQuery("insert into author set ?",
            {lastName:'Kivi',firstName:'Aleksis'},
            function({err,data}){
                console.log(data);
            })

*/