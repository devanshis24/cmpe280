/**
 * Created by devanshis24 on 11/23/2016.
 */
var patient = require('../models/patientSchema');
var doctor = require('../models/doctorSchema');

exports.signup=function(req,res){
    var newPatient = patient({
        name: req.param("fullname"),
        userid: req.param("userid"),
        email: req.param("email"),
        password: req.param("password"),
        mobile:req.param("mobile"),
        birthdate:req.param("birthdate")
    });

    newPatient.save(function (err) {
        if(err) throw err;
            else console.log("User Created");
    });
    console.log(req.param("email"));
    res.send({statusCode:200});
}

exports.signupDoctor=function(req,res){

    var newDoctor = doctor({
        name: req.param("fullname"),
        userid: req.param("userid"),
        email: req.param("email"),
        password: req.param("password"),
        gender: req.param("gender"),
        speciality: req.param("speciality"),
        mobile:req.param("mobile"),
        birthdate:req.param("birthdate")
    });

    newDoctor.save(function (err) {
        if(err) throw err;
        else console.log("User Created");
    });
    console.log(req.param("email"));
    res.send({statusCode:200});
}
exports.login=function(req,res,next){
    console.log("in login"+req.param("email"));
    var email = req.param("email");
    var password = req.param("password");

    patient.findOne({email: email, password: password}, function (err, patient) {
        if(err) {
            console.log(err);
            res.send({statusCode:500});
        }
        else if(!patient){
            res.send({statusCode:404});
        }
        else {
        req.session.user = patient;
        console.log("success login" + req.session.user);
        res.send({statusCode:200});
        }
        
    });

}

exports.loginDoctor=function(req,res){
    console.log("in login"+req.param("email"));
    var email = req.param("email");
    var password = req.param("password");

    doctor.findOne({email: email, password: password}, function (err, doctor) {
        if(err) {
            console.log(err);
            res.send({statusCode:500});
        }
        else if(!doctor){
            res.send({statusCode:404});
        }
        else {
        req.session.user = doctor;
        console.log("success login Doctor" + req.session.user);

        res.send({statusCode:200});
        }

    });
}