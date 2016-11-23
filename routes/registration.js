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
exports.login=function(req,res){
    res.send({statusCode:200});
}