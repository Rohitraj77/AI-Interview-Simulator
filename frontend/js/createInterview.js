const form = document.getElementById("createInterviewForm");

if(form){

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const btn=form.querySelector("button");

btn.disabled=true;

btn.innerHTML=`
<span class="spinner-border spinner-border-sm"></span>
Generating AI Interview...
`;

const role=document.getElementById("role").value;

const experience=document.getElementById("experience").value;

const techStack=document.getElementById("techStack").value;

const difficulty=document.getElementById("difficulty").value;

const questionCount=parseInt(document.getElementById("questionCount").value);

try{

const response=await fetch(
"http://localhost:5000/api/interview/generate",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

role,

experience,

techStack,

difficulty,

questionCount

})

});

const interview=await response.json();

localStorage.setItem(

"currentInterview",

JSON.stringify(interview)

);

window.location.href="interview.html";

}

catch(error){

console.log(error);

alert("Unable to Generate Interview");

}

btn.disabled=false;

btn.innerHTML="Generate AI Interview";

});

}