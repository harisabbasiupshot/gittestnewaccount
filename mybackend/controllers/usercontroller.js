var userModel = require('../models/usermodel')
const bcrypt = require("bcrypt")
var ObjectId = require('mongodb').ObjectID;
const saltRounds = 10;
const coursemodel = require('../models/coursemodel');
var qaModel =require('../models/quizassignmodel')

exports.getCourses =async function(req,res){ 
    const filter = {};
    const all = await coursemodel.find(filter).populate('courseteacher');
    res.json(all)

}
exports.getuserCourses =async function(req,res){ 
  const filter = {email:req.params.email};
  const all = await userModel.findOne(filter);
  console.log(all.courses)
  res.json(all.courses)

}
exports.getusercoursesTeachers =async function(req,res){ 
  const filter = {email:req.params.email};
  const all = await userModel.findOne(filter);
  console.log(all.courses)
  const all2= await coursemodel.find({_id: { $in: all.courses }},{courseteacher:1, _id:0}).populate('courseteacher')
  console.log(all2)
  res.json(all2)
}

exports.getusercoursesDetails =async function(req,res){ 
  const filter = {email:req.params.email};
  const all = await userModel.findOne(filter);
  console.log(all.courses)
  const all2= await coursemodel.find({_id: { $in: all.courses }}).populate('courseteacher')
  console.log(all2)
  res.json(all2)

}

    
       exports.enrollcourse = async function(req, res){
        var userandcourse = req.body;
        userModel.findOne({"email": req.body.useremail}, async function(err, creden) {
          creden.courses.push(req.body.id);
          creden.save()
          
          
      });
      return res.send({
        message: 'Enrolled In Course'
      });
  
       }
      
       
       exports.signup = async function(req, res){
        var countValue = req.body;
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  userModel.findOne({email:countValue.email},function(err,user){
    if(user) return res.status(400).json({ auth : false, message :"Email Already Exits"});
  
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "password":hash
    



} 
console.log("HashedPwd: ", hash)
  userModel.create(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    res.status(400).json({ auth : true, message :"You are now a registered student please login"});
          
}); 
});
});
       }
       exports.signin = async function(req, res){
        var countValue = req.body;
  console.log("U are ", countValue.email);
  
userModel.findOne({ email: countValue.email }, function(err, collection){
  if(err){
      console.log("Invalid Student");
      return res.send({
        success: false,
        message: 'Student not exists'
      });
  }else{
    
    if (collection!=null){
      console.log("Student found");
      bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
        console.log(resi)
      if (resi === true){
        console.log("Correct details found");
        console.log(collection.firstname+ countValue.email+collection._id)
        const id=collection._id
        /*var token = jwt.sign(id, "jwtsecret",{
          expiresIn:3000,

        });*/

        return res.send({
          success: true,
          //token: token,
          message: 'Correct Details',
          fname: collection.firstname,
          lname: collection.lastname,
          email: collection.email,
          islogged: "true",
          id: collection._id,
          favs: collection.favs
        });
      }else{
        return res.send({
          success: false,
          message: 'Error: Email and Pass Dont Match'
        });
       
      }
    });
      
    }else{
      console.log("Student not found");
      return res.send({
        success: false,
        message: 'Error: Incorrect Student, Recheck Your Email'
      });
    }
  }
   
});
       }
       exports.myQuizes =async function(req,res){ 
         console.log("Email: ", req.params.email)
        const filter = {email:req.params.email};
        const all = await userModel.findOne(filter);
        console.log(all.courses)
        const all2= await qaModel.find({course: { $in: all.courses }}).populate('teacher course')
        console.log(all2)
        res.json(all2)
      }