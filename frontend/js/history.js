const historyContainer = document.getElementById("historyContainer");
const search = document.getElementById("search");

let interviews = [];

async function loadHistory() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/interview/history"
        );

        interviews = await response.json();

        displayHistory(interviews);

    } catch (error) {

        console.log(error);

        historyContainer.innerHTML = `
            <div class="empty">
                Failed to load interview history.
            </div>
        `;

    }

}

function displayHistory(data) {

    historyContainer.innerHTML = "";

    if (data.length === 0) {

        historyContainer.innerHTML = `
            <div class="empty">
                No Interviews Found 🚀
            </div>
        `;

        return;
    }

    data.forEach((item) => {

        const date = new Date(item.createdAt);

        historyContainer.innerHTML += `

        <div class="col-lg-6">

            <div class="history-card">

                <h4>${item.role}</h4>

                <div class="score">
                    ⭐ Score :
                    ${item.finalScore || 0}/10
                </div>

                <div class="date">
                    📅 ${date.toLocaleDateString()}
                </div>

                <div class="buttons">

                    <button
                        class="view-btn"
                        onclick="viewInterview('${item._id}')">

                        <i class="bi bi-eye-fill"></i>

                        View Report

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteInterview('${item._id}')">

                        <i class="bi bi-trash-fill"></i>

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = interviews.filter((item) =>
        item.role.toLowerCase().includes(value)
    );

    displayHistory(filtered);

});

async function deleteInterview(id) {

    const confirmDelete = confirm(
        "Delete this interview?"
    );

    if (!confirmDelete) return;

    try {

        await fetch(
            `http://localhost:5000/api/interview/${id}`,
            {
                method: "DELETE"
            }
        );

        loadHistory();

    } catch (error) {

        console.log(error);

    }

}

function viewInterview(id) {

    localStorage.setItem(
        "reportId",
        id
    );

    window.location.href =
        "report.html";

}

loadHistory();