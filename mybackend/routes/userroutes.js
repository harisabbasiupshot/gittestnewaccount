var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/usercontroller');

 
        
        router.get('/getcourses',user_controller.getCourses)
           router.post('/sign-up', user_controller.signup)
           router.post('/sign-in', user_controller.signin)
           router.post('/enrollcourse', user_controller.enrollcourse)
           router.get('/getusercourses/:email', user_controller.getuserCourses)
           router.get('/getusercoursesteachers/:email', user_controller.getusercoursesTeachers)
           router.get('/getusercoursesdetails/:email', user_controller.getusercoursesDetails)
           router.get('/myquizes/:email', user_controller.myQuizes)
           module.exports = router;
