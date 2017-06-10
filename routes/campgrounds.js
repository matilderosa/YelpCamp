var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

// INDEX ROUT - Show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            //Take all the campgrounds from the DB to the campgrounds.ejs file
              res.render("campgrounds/index", {campgrounds: allCampgrounds});  
        }
    });
});


// CREATE ROUTE - add new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var name          = req.body.name,
        price         = req.body.price,
        image         = req.body.image,
        description   = req.body.description,
        author        = {
            id: req.user._id,
            username: req.user.username
        },
        newCamp       = {name: name, image: image, price: price, description: description, author: author};
        //Create  a new campground and save to the DB
        Campground.create(newCamp, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else{
                //redirect to the campgrounds page
                res.redirect("/campgrounds");
            }
        })
});

// NEW ROUTE - show form to create new route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW ROUTE - show information about one particular campground
router.get("/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwenership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render("campgrounds/edit", {campground: foundCamp}); 
        });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwenership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwenership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;