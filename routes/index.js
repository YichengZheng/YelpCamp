var express = require("express");
var router = express.Router();
var passport = require("passport");

var user = require("../models/user");

//========= Route ========= 
router.get("/", function(req, res){
    res.render("home");
});

// var campgrounds = [
//             {name: "Salmon Creek", image: "https://images.pexels.com/photos/344102/pexels-photo-344102.jpeg?auto=compress&cs=tinysrgb&h=350"},
//             {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__340.jpg"},
//             {name: "Sugar Creek", image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&h=350"}
//         ];



// Auth routes 
// get request to show register route
router.get("/register", function(req, res){
    res.render("register");
});

// handle signup logic
router.post("/register", function(req, res){
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});
// router.post("/register", function(req, res){
//     user.register(new user({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             // display error from user.register
//             console.log(err);
//             req.flash("error", err.message);
//             return res.render("register");
//         }
//         // register user first and then login
//         passport.authenticate("local")(req, res, function(){
//             req.flash("success", "Welcome to YelpCamp " + user.username);
//             res.redirect("/campgrounds");
//         });
//     });
// });


// login logic and routes
// LOGIN ROUTES
//render login form
router.get("/login", function(req, res){
   res.render("login"); 
});
//login logic
//middleware to handle login, which will be run first before the callback
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

// logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;