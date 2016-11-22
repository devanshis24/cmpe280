/**
 * Created by devanshis24 on 11/21/2016.
 */
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/register');
var  Schema= mongoose.Schema;
//model
//var first_name = mongoose.model('first_Name', {name: String});
var patientRequests =  new Schema({
    name: String,
    userid: String,
    email: String,
    password: String,
    mobile: Number,
    patientList: [String],
    created_At: Date,
    Updated_At: Date
});

var patientRequests = mongoose.model('patientRequestSchema', patientRequests);
module.exports = patientRequests;