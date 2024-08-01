var express = require("express");
var router = express.Router();

var user = require("../model/user");

//Hashing password
var bcrypt = require("bcrypt");


/////////////USER LOGIN////////////////
router.post("/login", async function (req, res, next) {
  try {
    var check = await user.findOne({ username: req.body.username });
    // console.log(check);

    if (!check) {
      res.send('{"data":"User Not Found"}');
    } else {
      //compare the hash password form the database plain text
      var isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
      
      if (isPasswordMatch) {

        // res.send('{"data":"Valid User"}');

        req.session.username = check.username;
        req.session.role = check.role;
        req.session.name = check.name;
        
        if(req.session.username){
          res.send('{"data":"Valid User"}');
          req.session.count++;
        }
        else{
          req.session.count = 1;
        }
      } else {
        res.send('{"data":"Password is Invalid"}');
      }
    }
  } catch {
    res.send('{"data":"Wrong Details"}');
  }
  
});

///////USER SIGNUP///////////
router.post("/signup", async function (req, res, next) {
  var data = {
    name    : req.body.name,
    username: req.body.username,
    password: req.body.password,
    role    : req.body.role
  };

  //check if user already exist in the database
  var existingUser = await user.findOne({ username: data.username });

  if (existingUser) {
    res.send('{"data":"Username already exist. please try different Username"}');
  } else {
    // hash the password using bcrypt
    const saltRound = 10; //Number of salt Round for bcrypt
    const hashPassword = await bcrypt.hash(data.password, saltRound);

    data.password = hashPassword ; // Replace the hash password with orignal password

    var userdata = await user.insertMany(data);
    if (userdata) {
      res.send('{"data":"Register Secussfully"}');
      console.log(userdata);
    } else {
      res.send('{"data":"Not Register"}');
    }
  }
});


/////////LOGIN CHECK/////////

router.get('/logincheck', function (req, res) {

  var name = req.session.name;
  var username = req.session.username;
  var role =  req.session.role;

  if (!username) {
    res.send('{"data":"notlogin"}');
  }
  else{
    res.send('{"data":"Name is :- '+name+'   ,   UserName :-' + username + '    ,   Role is :-'+role+'"}');
  }

});

///////////LOGOUT////////
router.get('/logout' , function(req,res){

  if(req.session.username){
      req.session.username = null; 
      // console.log(req.session.username);
      res.send('{"data":"logout"}');
  }
  if(!req.session.username){
      console.log(req.session.username);
      res.send('{"data":"nosession"}');
  }

});

module.exports = router;
