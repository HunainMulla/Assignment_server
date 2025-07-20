const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    totalPoints:Number,
    pointsHistory:[{ 
        point:Number,
        date:Date,
    }]
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;