// Open MySQL command line client and type in the following commands
// You can also copy the commands and paste them to the command line client

// create database crm;
// use crm;
// create table person(id int primary key not null auto_increment, name varchar(32), address varchar(32));
// insert into person values(null,'Tom','Bugstreet');

// create user 'dbuser'@'localhost' identified with mysql_native_password BY 'test123';
// grant all privileges on crm.* to dbuser@localhost;

// After creating the database you should be able to execute this file
// > node dbsample.js

let options={
    protocol: "mysql",
    host: 'localhost',
    port: 3306,
    user     : "dbuser",
    password : "test123",
    database : 'CRM'
}

let mysql=require("mysql");

let pool=mysql.createPool(options);
pool.getConnection(function(err,conn){
	if (err){
		if (conn) conn.release();
		console.log("Error ",err);
		return;
	}
	let person={name:'John',address:'Teststreet'};
	conn.query("INSERT INTO person SET ?",person,function(err,data){
		//console.log(err,data);
		console.log("Inserted id",data.insertId);
	});	
	conn.query("SELECT * from Person",function(err,rows,fields){
		console.log(rows);
		conn.release();
		pool.end(function(err){
			if (err) console.log(err);
		});
	});
});


