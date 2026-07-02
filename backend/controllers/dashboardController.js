const Interview = require("../models/Interview");

const getDashboard = async (req, res) => {

    try {

        const interviews = await Interview.find();

        const totalInterviews = interviews.length;

        let bestScore = 0;
        let totalScore = 0;

        interviews.forEach((item) => {

            totalScore += item.finalScore || 0;

            if ((item.finalScore || 0) > bestScore) {
                bestScore = item.finalScore;
            }

        });

        const averageScore =
            totalInterviews === 0
                ? 0
                : (totalScore / totalInterviews).toFixed(1);

        const recentInterviews =
            await Interview.find()
                .sort({ createdAt: -1 })
                .limit(5);

        res.json({

            totalInterviews,

            bestScore,

            averageScore,

            recentInterviews

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Dashboard Error"

        });

    }

};

module.exports = {

    getDashboard

};