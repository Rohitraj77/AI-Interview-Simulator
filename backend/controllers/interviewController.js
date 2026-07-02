const Interview = require("../models/Interview");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ================================
// Generate Interview Questions
// ================================

const generateInterview = async (req, res) => {

    try {

        const {
            role,
            experience,
            techStack,
            difficulty,
            questionCount
        } = req.body;

        const prompt = `
You are an expert technical interviewer.

Generate exactly ${questionCount} interview questions.

Role: ${role}
Experience: ${experience}
Tech Stack: ${techStack}
Difficulty: ${difficulty}

Return ONLY a JSON array.

Example:

[
"What is React?",
"What is Virtual DOM?"
]
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let text = response.text.trim();

        text = text.replace(/```json/g, "");
        text = text.replace(/```/g, "").trim();

        const questions = JSON.parse(text);

        const interview = await Interview.create({

            userId: req.body.userId || null,

            role,

            experience,

            techStack,

            difficulty,

            questionCount,

            questions,

            answers: [],

            finalScore: 0

        });

        res.status(200).json(interview);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Interview Generation Failed"
        });

    }

};

// ================================
// Evaluate Interview
// ================================

const evaluateInterview = async (req, res) => {

    try {

        const {

            interviewId,

            answers

        } = req.body;

        const interview = await Interview.findById(interviewId);

        if (!interview) {

            return res.status(404).json({

                message: "Interview not found"

            });

        }

        const prompt = `
You are an expert interviewer.

Evaluate the candidate answers.

Questions:

${JSON.stringify(interview.questions)}

Answers:

${JSON.stringify(answers)}

Return ONLY JSON.

Example:

{
"overallScore":8.6,
"feedback":[
{
"question":"...",
"answer":"...",
"score":9,
"feedback":"...",
"correctAnswer":"...",
"suggestion":"..."
}
]
}
`;

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });

        let result = response.text.trim();

        result = result.replace(/```json/g, "");
        result = result.replace(/```/g, "").trim();

        const evaluation = JSON.parse(result);

        interview.answers = evaluation.feedback;
        interview.finalScore = evaluation.overallScore;

        await interview.save();

        res.status(200).json(evaluation);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Evaluation Failed"

        });

    }

};

// ================================
// Get Interview History
// ================================

const getInterviewHistory = async (req, res) => {

    try {

        const interviews = await Interview.find()

            .sort({

                createdAt: -1

            });

        res.status(200).json(interviews);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Unable to fetch history"

        });

    }

};

// ================================
// Get Single Interview
// ================================

const getInterviewById = async (req, res) => {

    try {

        const interview = await Interview.findById(req.params.id);

        if (!interview) {

            return res.status(404).json({

                message: "Interview not found"

            });

        }

        res.status(200).json(interview);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Unable to fetch interview"

        });

    }

};

// ================================
// Delete Interview
// ================================

const deleteInterview = async (req, res) => {

    try {

        await Interview.findByIdAndDelete(req.params.id);

        res.status(200).json({

            message: "Interview Deleted Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Unable to delete interview"

        });

    }

};

module.exports = {

    generateInterview,

    evaluateInterview,

    getInterviewHistory,

    getInterviewById,

    deleteInterview

};