const { query } = require('express');
var express = require('express');
var router = express.Router();
// var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var {authorize} = require('../auth/auth');

// var ensureLoggedIn = ensureLogIn('/signin-admin');
var dbconnect = require('../db').connection;

const ensureLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

router.use(ensureLoggedIn);
router.use(authorize('ADMIN'));

// TO-DO: query from MySQL and render dashboard page
async function getStatistics(field){
    var query = "SELECT COUNT(*) AS COUNT FROM " + field;
    return new Promise((resolve, reject) => {
        dbconnect.query(query, (err, result, fields) =>{
            if (err){
                reject(err);
            }
            else {
                resolve(parseInt(result[0].COUNT));
            }
        })
    })
}

async function get_all_courses(){
    return new Promise((resolve, reject) => {
        course_query = "SELECT * FROM course";
        dbconnect.query(course_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

async function get_all_class(){
    return new Promise((resolve, reject) => {
        class_query = "SELECT * FROM class";
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

async function get_all_teacher(){
    return new Promise((resolve, reject) => {
        class_query = "SELECT * FROM teacher";
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

async function get_all_student(){
    return new Promise((resolve, reject) => {
        class_query = "SELECT * FROM student";
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

async function get_unpaid(){
    return new Promise((resolve, reject) => {
        class_query = 'SELECT * FROM student_class WHERE status = "unpaid"';
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}










// --------------------------------------------------------------

router.get('/courses', async (req, res) => {
    
    //-------STATISTICS
    var dashboard_data = {};
    var stat = {};
    stat.course = await getStatistics("course");
    stat.class = await getStatistics("class");
    stat.student = await getStatistics("student");
    stat.teacher = await getStatistics("teacher");
    dashboard_data.stat = stat;
    //-----COURSE INFO ------------------
    //course_query = "SELECT * FROM course";

    //----CLASS INFO ---------------------  
    dashboard_data.class = await get_all_class();
    dashboard_data.courses = await get_all_courses();
    res.json(dashboard_data);
})

router.get('/teachers', async (req, res) =>{
    var all_teacher = await get_all_teacher();
    res.json(all_teacher);    
})

router.get('/students', async (req, res) =>{
    var all_student = await get_all_student();
    res.json(all_student);    
})

router.get('/handle-register', async (req, res) =>{
    var unpaid_register = await get_unpaid();
    res.json(unpaid_register);    
})

module.exports = router;