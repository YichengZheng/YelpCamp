//========= Schema Setup ========= 
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var user = require("../models/user");

// all the middlewares go here

 var middlewareObj = {};
 
 // middleware, check if current user matches the user created the content
 middlewareObj.checkCampgroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        // if it's logged in, compare the the current logged in session user id against user id in the foundCampground
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                req.flash("error", "Comment not found");
                // redirect back to previous page
                res.redirect("back");
            }else{
                // foundCampground.author.id is a mongoose object, use .equals method
                // req.user._id is a string
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You dont' have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        res.redirect("back");
    }
}
 
 // middleware, check if current user matches the user created the content
middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        // if it's logged in, compare the the current logged in session user id against user id in the foundCampground
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                // redirect back to previous page
                req.flash("error", "Comment not found");
                res.redirect("back");
            }else{
                // foundComment.author.id is a mongoose object, use .equals method
                // req.user._id is a string
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You dont' have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        res.redirect("back");
    }
}


// middleware to check if it's logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // flash, display error first in the next request, and then redirect to login (handle this in login)
    // need to put before redirect
    req.flash("error", "Please login first");
    res.redirect("/login");
}
 
 module.exports = middlewareObj

