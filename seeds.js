var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    
var data = [
    {name: "Cloud's dream",
     image: "http://images.huffingtonpost.com/2015-03-19-1426803829-9735139-8f524af8ef2b50a4dab24786229c28c11.jpg",
     description: "bla bla bla"},
     
    {name: "Lucky Lake",
     image: "http://blog.cremonesi.com.br/wp-content/uploads/2017/03/camping-voyageurs-national-park-tent.jpg.rend_.tccom_.1280.960.jpeg",
     description: "bla bla bla"},
     
    {name: "Mountain Ranger",
     image: "http://blog.cremonesi.com.br/wp-content/uploads/2017/03/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
     description: "bla bla bla"}
    ]    
    
function seedDB(){
    //Remove the campgrounds
   Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed grounds!");
    //Add some campgrounds
    //   data.forEach(function(seed){
    //       Campground.create(seed, function(err, campground){
    //           if(err){
    //               console.log(err);
    //           } else {
    //               console.log("Added new campground");
    //                   //Add some comments
    //                   Comment.create(
    //                       {
    //                           text: "This place is great it doesn't have many people!",
    //                           author: "Homer"
    //                       },function(err, comment){
    //                           if(err){
    //                               console.log(err);
    //                           } else{
    //                               campground.comments.push(comment);
    //                               campground.save();
    //                               console.log("created new comment");
    //                           }
    //                       });
    //           }
    //       });
    //   });
   });
};

module.exports = seedDB;