var Campground = require("../models/campground"),
    Comment = require("../models/comment");
var middlewareObj = {};

// check if the user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

//Check if the user owns the camp
middlewareObj.checkCampgroundOwenership = function(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp){
            if (err) {
                console.log(err);
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            } else {
             //does the user own the campground
                if (foundCamp.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


//Check if the user owns the comment
middlewareObj.checkCommentOwenership = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                console.log(err);
                res.redirect("/back");
            } else {
             //does the user own the comment
                if (foundComment.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that"); //this has to come before redirect because it will only show on the next page
        res.redirect("back");
    }
} 

module.exports = middlewareObj;