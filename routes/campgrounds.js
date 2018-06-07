var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var user = require("../models/user");

//middleware
var middleware = require("../middleware/index.js");

// Index - show all campgrounds
router.get("/", function(req,res){
    // get user data
    
    // get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log("ERROR");
        }else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});           
        }
    })
    

});

// CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req,res){
    // get data from form, and then add to campground array
    // redirect to /campgrounds page
    // parse already with body-parser
    var name = req.body.name;
    var price = req.body.price;
    var imageurl = req.body.image;
    var desc = req.body.description;
    // associate author to the newly created campground
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    // make new object
    var newCamp = {
        name: name,
        price: price,
        image: imageurl,
        description: desc,
        author: author
    };

    // create new campgrounds and save to the database
    Campground.create(
        newCamp
    , function(err, camp){
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");           
        }
    })
    // campgrounds.push(newCamp);
    // redirect
    // by default, it's redirected to GET

});

// NEW - show form to create new campground
// separate page to show the form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW - show more info about a specific campground
// extract ID number from req.params.id
router.get("/:id", function(req, res) {
    // find the campground with provided id and render
    console.log(req.params);
    // the id below refers to the id after :
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            console.log(err);
        }else{
            // pass in the foundCampground
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

// Edit campground route, form in edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    // find the campground id#
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit",{campground: foundCampground});
        }
    }) 
})

// update campground route, form submitted in update
router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    // create a new object containing updated information
    var data = {name: req.body.name, image: req.body.image, description: req.body.description};
    //find and upate the correct
    Campground.findByIdAndUpdate(req.params.id, data, function(err, updatedCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Remove campground route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");           
        }
    })
});

module.exports = router;