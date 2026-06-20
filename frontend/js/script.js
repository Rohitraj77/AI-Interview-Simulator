const startBtn = document.getElementById("startBtn");

if(startBtn){

    startBtn.addEventListener("click", () => {

        const role = document.getElementById("role").value;

        if(role === ""){
            alert("Please select a role");
            return;
        }

        alert(`Starting ${role} Interview`);

    });

}