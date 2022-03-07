const express =require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const router = require("./router.js");
const db = require("./mysql.js");

const app = express();

app.use(cookieParser());


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);


//let sql = "insert into re_list set ?";
//let data = {name:1000000021};
//db.base(sql,data,(results)=>{
//	console.log(results);
//});

app.listen(3000,()=>{
	console.log("app is run...")
});