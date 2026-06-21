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


const registerForm = document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try{

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            if(response.ok){
                window.location.href = "login.html";
            }

        }catch(error){
            console.log(error);
        }

    });

}

const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        try{

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(response.ok){

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                window.location.href =
                    "dashboard.html";
            }
            else{
                alert(data.message);
            }

        }catch(error){
            console.log(error);
        }

    });

}

const welcomeUser =
    document.getElementById("welcomeUser");

if(welcomeUser){

    const user =
        JSON.parse(localStorage.getItem("user"));

    if(user){
        welcomeUser.textContent =
            `Welcome, ${user.name} 👋`;
    }

}