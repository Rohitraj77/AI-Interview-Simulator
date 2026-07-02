const welcomeUser = document.getElementById("welcomeUser");

const user = JSON.parse(localStorage.getItem("user"));

if (welcomeUser && user) {

    welcomeUser.innerHTML = `Welcome, ${user.name} 👋`;

}

const totalInterviews = document.getElementById("totalInterviews");
const bestScore = document.getElementById("bestScore");
const averageScore = document.getElementById("averageScore");
const recentContainer = document.getElementById("recentInterviews");

async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/dashboard"
        );

        const data = await response.json();

        totalInterviews.textContent = data.totalInterviews;
        bestScore.textContent = data.bestScore + "/10";
        averageScore.textContent = data.averageScore + "/10";

        recentContainer.innerHTML = "";

        if (data.recentInterviews.length === 0) {

            recentContainer.innerHTML = "<p>No Interviews Yet</p>";

            return;

        }

        data.recentInterviews.forEach(interview => {

            recentContainer.innerHTML += `
                <div class="recent-card">
                    <h4>${interview.role}</h4>
                    <p>⭐ ${interview.finalScore}/10</p>
                    <small>${new Date(interview.createdAt).toLocaleDateString()}</small>
                </div>
            `;

        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        recentContainer.innerHTML = `
            <div class="alert alert-danger">
                Unable to load dashboard data.
            </div>
        `;

    }

}

loadDashboard();