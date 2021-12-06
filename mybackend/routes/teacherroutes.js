var express = require('express');
var router = express.Router();
var teacher_controller = require('../controllers/teachercontroller');

 
    
           
           router.post('/teachersign-up', teacher_controller.signup)
           router.post('/teachersign-in', teacher_controller.signin)
           router.get('/getteachers',teacher_controller.getteachers)
           router.get('/getQA',teacher_controller.getQA)
           router.post('/assignqa',teacher_controller.assignQA)
           router.get('/getteachercourses/:id',teacher_controller.getteacherCourses)
           router.get('/assignedQAs/:email', teacher_controller.assignedQAs)
           module.exports = router;
