var mongoose = require("mongoose");

//SCHEMA SETUP

//Creates the schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

//Creates the model
module.exports = mongoose.model("Comment", commentSchema);