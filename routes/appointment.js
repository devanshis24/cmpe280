var appointment = require('../models/appointmentSchema');

exports.bookAppointment=function(req,res){
    var newAppointment = appointment({
        name: req.param("name"),
        dob: req.param("dob"),
        gender: req.param("gender"),
        service: req.param("service"),
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