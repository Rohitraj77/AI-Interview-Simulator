const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    role: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    techStack: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        required: true
    },

    questionCount: {
        type: Number,
        required: true
    },

    questions: [
        {
            type: String
        }
    ],

    answers: [
        {
            question: {
                type: String
            },

            answer: {
                type: String
            },

            score: {
                type: Number
            },

            feedback: {
                type: String
            },

            correctAnswer: {
                type: String
            },

            suggestion: {
                type: String
            }

        }
    ],

    finalScore: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
});

module.exports =
mongoose.model(
    "Interview",
    interviewSchema
);