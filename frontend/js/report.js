const evaluation =
JSON.parse(localStorage.getItem("evaluation"));

const overallScore =
document.getElementById("overallScore");

const scoreBar =
document.getElementById("scoreBar");

const feedbackContainer =
document.getElementById("feedbackContainer");

if(!evaluation){

alert("No Report Found");

window.location.href="dashboard.html";

}

overallScore.innerHTML=
evaluation.overallScore+"/10";

scoreBar.style.width=
(evaluation.overallScore*10)+"%";

scoreBar.innerHTML=
(evaluation.overallScore*10)+"%";

feedbackContainer.innerHTML="";

evaluation.feedback.forEach((item,index)=>{

feedbackContainer.innerHTML+=`

<div class="feedback-card">

<h4>

Question ${index+1}

</h4>

<p>

<strong>Question:</strong>

${item.question}

</p>

<hr>

<p>

<strong>Your Answer:</strong>

${item.answer}

</p>

<hr>

<p>

<strong>Score:</strong>

⭐ ${item.score}/10

</p>

<hr>

<p>

<strong>AI Feedback:</strong>

${item.feedback}

</p>

<hr>

<p>

<strong>Correct Answer:</strong>

${item.correctAnswer}

</p>

<hr>

<p>

<strong>Suggestion:</strong>

${item.suggestion}

</p>

</div>

`;

});

const downloadBtn =
document.getElementById("downloadBtn");

downloadBtn.addEventListener("click",()=>{

window.print();

});