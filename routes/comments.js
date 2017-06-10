var express    = require("express"),
    router     = express.Router({mergeParams: true}), //mergeParams merges the params from the campground and the comment so that we can find th ID
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");


//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("comments/new", {campground: foundCamp});
        }
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    // Lookup campground using ID
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        } else {
            // Create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id; // the comment.author.id comes from the commentSchema
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    // Connect new comment to campground
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    // Redirect to campground show page
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            });
        }
    });
});


// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwenership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});  
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
        
    });
});

// DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function (err){
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Successfully deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



module.exports = router;