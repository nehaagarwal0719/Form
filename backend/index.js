const express=require('express');
const cors=require('cors');
const mysql=require('mysql');

const app= express();

const SELECT_ALL_PRODUCT_QUERY='SELECT * FROM user';

const connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'poiuytrewq',
	database:'DocVer'
});

connection.connect(err=>{
	if(err){
		return err;
	}
});

//console.log(connection);

app.use(cors());

app.get('/',(req,res)=>{
	res.json('hi there');
});


app.get('/users',(req,res)=>{
	connection.query(SELECT_ALL_PRODUCT_QUERY,(err,results)=>{
		if(err){
			return res.send(err);
		}
		else{
			return res.json({
				data:results
			})
		}
	});
});

app.get('/users/add',(req,res)=>{
	const {fname,lname,email, password}=req.query;

	const INSERT_USER_QUERY=`INSERT INTO user (fname,lname,email,password) VALUES('${fname}','${lname}','${email}','${password}')`;
	//console.log(name,password);
	//res.send('adding user');
	connection.query(INSERT_USER_QUERY,(err,results)=>{
		if(err){
			return res.send(err);
		}
		else{
			return res.send('added');
		}
	});

	
});



app.listen(4000,()=>{
console.log('listening')
});