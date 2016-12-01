var appointment = require('../models/appointmentSchema');
var doctor = require('../models/doctorSchema');
var patient=require('../models/patientSchema');

exports.bookAppointment = function(req, res){
    var newAppointment = appointment({
        name: req.param("name"),
        dob: req.param("dob"),
        gender: req.param("gender"),
        service: req.param("service"),
        doctorName: req.param("doctorName"),
        appointmentDate: req.param("appointmentDate"),
        email: req.param("email"),
        phone: req.param("phone"),
        serviceDesc: req.param("serviceDesc")
    });

    newAppointment.save(function (err) {
        if(err) throw err;
        else console.log("Appointment Created");
    });
    res.send({statusCode:200});
};

exports.findDoctors = function(req, res){
    doctor.find({}, function (err, doctors) {
        if(err) {
            console.log(err);
            res.send({statusCode:500, result: []});
        } else if(!doctors.length){
            res.send({statusCode:404, result: []});
        } else {
            res.send({statusCode:200, result: doctors});
        }

    });
};
exports.findPatients=function(req,res){
    patient.find({}, function (err, patients) {
        if(err) {
            console.log(err);
            res.send({statusCode:500, result: []});
        } else if(!patients.length){
            res.send({statusCode:404, result: []});
        } else {
            res.send({statusCode:200, result: patients});
        }

    });
}