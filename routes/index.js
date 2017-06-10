var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");


// Root Route
router.get("/", function(req, res){
    res.render("landing");
});


//Show sign up form
router.get("/register", function(req, res){
    res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN
// show login form
router.get("/login", function(req, res){
    res.render("login");
});

//Login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

//LOGOUT
//Logout rout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You've successfully logged out");
    res.redirect("/campgrounds");
});

//check if the user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;