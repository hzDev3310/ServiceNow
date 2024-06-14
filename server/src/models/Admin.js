const { model, Schema } = require("mongoose");
const adminSchema = new Schema({
    name : String,
    email : String,
    phoneNumber : String,
    password : String,
})
const adminModel = model("Admin", adminSchema);
module.exports = adminModel;