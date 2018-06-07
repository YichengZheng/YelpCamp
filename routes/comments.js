var express = require("express");
// merge the parameters in campgrounds and comments together, so that it can access :id
var router = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var user = require("../models/user");

//middleware
var middleware = require("../middleware/index.js");

// Comments route with middleware to check if user is logged in
router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: foundCampground});
        }
    })
});

// post route for comment with middleware to ensure user is logged in 
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Comment not found");
                    console.log(err);
                }else{
                    // add username and id to comment, and then save the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // associate the comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Comment posted");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

//comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            req.flash("error", "Comment not found");
            res.redirect("back");
        }else{
            // pass in the campground id and comment id
            res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});           
        }
    })
})
// comment update route
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "Comment not found");
            res.redirect("back");
        }else{
            req.flash("success", "Comment updated");
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

// comment delete route
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Comment not found");
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);           
        }
    })
})





module.exports = router;