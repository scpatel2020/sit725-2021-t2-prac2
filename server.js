
var express = require("express");
var app = express()
var users =[];

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

const addNumbers = (number1, number2, number3) => {
    var num1 = parseInt(number1)
    var num2 = parseInt(number2)
    var num3 = parseInt(number3)
    console.log(num1, num2)
    if(isNaN(num1) || isNaN(num2 || isNaN(num3))) {
        return false
    }
    else {
        var result = num1 + num2 +num3;
        return result;
    }
}

app.get("/addTwoNumbers",(req,res) => {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var number3 = req.query.number3;
    var result = addNumbers(number1,number2,number3)
    if(result == false){
        res.json({statusCode: 400, data: null, message:"Failure"}) 
    }
    else{
        res.json({statusCode: 200, data: result, message:"Success"})
    }
})

app.post("/user/create",(req,res) => {
    let userData = {}
    userData.name = req.body.name;
    userData.age = req.body.age;
    users.push(userData);
    res.json({statusCode: 200, data: userData, message:"Created"})
})

app.get("/user",(req,res) => {
    var age = parseInt(req.query.age);
    var userFormated = [];
    if(isNaN(age)){
        res.json({statusCode: 200, data: users, message:"Success"})
    }
    else {
        for(var i = 0 ;i< users.length ; i++){
            if(age< users[i].age){
                userFormated.push(users[i])
            }
        }
        res.json({statusCode: 200, data: userFormated, message:"Success"})
    }
})

app.listen(port,()=>{
    console.log("Application has started on port: ",port)
})
