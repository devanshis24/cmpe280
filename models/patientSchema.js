/**
 * Created by devanshis24 on 11/21/2016.
 */
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/register');
var  Schema= mongoose.Schema;
//model
//var first_name = mongoose.model('first_Name', {name: String});
var patientRegister =  new Schema({
    name: String,
    userid: String,
    email: String,
    password: String,
    mobile: Number,
    appointmentId: [String],
    created_At: Date,
    Updated_At: Date
});

var patient = mongoose.model('patientSchema', patientRegister);
module.exports = patient;