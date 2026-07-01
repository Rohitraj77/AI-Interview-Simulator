const Interview = require("../models/Interview");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ==============================
// Generate Interview Questions
// ==============================

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

Return ONLY a valid JSON array.

Example:
[
"What is React?",
"What is Virtual DOM?",
"What is useEffect?"
]
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let text = response.text.trim();

        // Remove markdown if Gemini returns ```json
        text = text.replace(/```json/g, "");
        text = text.replace(/```/g, "").trim();

        const questions = JSON.parse(text);

        const interview = await Interview.create({

            role,
            experience,
            techStack,
            difficulty,
            questionCount,
            questions

        });

        res.status(200).json(interview);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Interview Generation Failed"
        });

    }

};

// ==============================
// Evaluate Interview Answers
// ==============================

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
You are an expert technical interviewer.

Evaluate the following interview.

Questions:
${JSON.stringify(interview.questions)}

Answers:
${JSON.stringify(answers)}

Return ONLY valid JSON.

Example:

{
  "overallScore": 8.5,
  "feedback": [
    {
      "question": "What is React?",
      "answer": "React is a library...",
      "score": 9,
      "feedback": "Good answer.",
      "correctAnswer": "React is a JavaScript library used to build UI.",
      "suggestion": "Mention Virtual DOM."
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

module.exports = {

    generateInterview,
    evaluateInterview

};