const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    role:String,

    questions:[String],

    answers:[String],

    score:Number,

    feedback:String

},
{
    timestamps:true
});

module.exports =
    mongoose.model(
        "Interview",
        interviewSchema
    );