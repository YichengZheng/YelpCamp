var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Take passportLocalMongoose package, and add methods come with that package into the userSchema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);