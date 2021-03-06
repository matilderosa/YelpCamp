var mongoose = require("mongoose");

//SCHEMA SETUP

//Creates the schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: { type: Date, default: Date.now },
    description: String,
    author: {
        id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//Creates the model
module.exports = mongoose.model("Campground", campgroundSchema);