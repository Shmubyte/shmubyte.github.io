

document.querySelector("button").addEventListener("click", gradeQuiz);
//globals
let score = 0;
var attempts = localStorage.getItem("total_attempts");;

display10Choices();

function display10Choices(){
    document.querySelector("#q10Choices").innerHTML = "";
    let states = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    states = _.shuffle(states);
    let choicesHTML = "";
    
    for(let i = 0; i < states.length; i++){
        choicesHTML += `
            <div>
                <input type="radio" name="q10" id="${states[i]}" value="${states[i]}">
                <label for="${states[i]}">${states[i]}</label>
            </div>
        `;
    }
    
    document.querySelector("#q10Choices").innerHTML = choicesHTML;
}

function gradeQuiz(){
    console.log("Grading quiz…");
    if(isFormValid() == false){
        return;
    }
    
    // Clear ALL previous feedback before grading
    for(let i = 1; i <= 10; i++){
        let feedbackDiv = document.querySelector(`#q${i}Feedback`);
        let markImg = document.querySelector(`#markImg${i}`);
        
        if(feedbackDiv){
            feedbackDiv.innerHTML = "";
            feedbackDiv.className = "";
        }
        if(markImg){
            markImg.innerHTML = "";
        }
    }
    // Clear all validation messages
    document.querySelectorAll(".validationFdbk").forEach(div => {
        div.innerText = "";
    });
    
    //variables
    score = 0;
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value.toLowerCase();
    let q3Response = document.querySelector("#q3").value.toLowerCase();
    let q4Response = document.querySelector("#q4").value.toLowerCase();
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value.toLowerCase();
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q8Response = document.querySelector("#q8").value.toLowerCase();
    
    // Check if q10 radio is selected before accessing .value
    let q10RadioElement = document.querySelector("input[name=q10]:checked");
    let q10Response = q10RadioElement ? q10RadioElement.value : "";

    console.log(q10Response);

    // Clear ALL validation messages on successful submission
    document.querySelectorAll(".validationFdbk").forEach(div => {
        div.innerText = "";
    });
    
    //Q1
    if(q1Response == "sacramento"){
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }
    //Q2
    if(q2Response == "hawaii"){
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }
    //Q3
    if(q3Response == "florida"){
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }
    //Q4
    if(q4Response == "death valley"){
        rightAnswer(4);
    }
    else {
        wrongAnswer(4);
    }
    //Q5
    if(q5Response == "al"){
       rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }
    //Q6
    if(q6Response == "utah"){
        rightAnswer(6);
    }
    else {
        wrongAnswer(6);
    }
    //Q7 - FIXED
    if(q7Response == "lake michigan"){
        rightAnswer(7);
    }
    else {
        wrongAnswer(7);
    }
    //Q8
    if(q8Response == "the great plains" || q8Response == "great plains"){
        rightAnswer(8);
    }
    else {
        wrongAnswer(8);
    }
    //Q9
    if(document.querySelector("#Jefferson").checked && 
       document.querySelector("#Washington").checked && 
       !document.querySelector("#Jackson").checked && 
       !document.querySelector("#Franklin").checked){
        rightAnswer(9);
    }
    else {
        wrongAnswer(9);
    }
    //Q10
    if(q10Response == "Rhode Island"){
        rightAnswer(10);
    }
    else {
        wrongAnswer(10);
    }
    // Score display
    let scoreElement = document.querySelector("#totalScore");
    scoreElement.innerHTML = "Total Score: " + score + " / 100";
    
    if(score >= 80){  // Changed from 40 to 80 for 80%
        scoreElement.className = "";
        scoreElement.style.color = "green";
        document.querySelector("#BtoAMessage").innerHTML = "CONGRATULATIONS YOU SCORED ABOVE 80 POINTS!"
    } else {
        scoreElement.className = "";
        scoreElement.style.color = "red";
        document.querySelector("#BtoAMessage").innerHTML = ""; // Clear message if below 80
    }

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`; 
    localStorage.setItem("total_attempts", attempts);
}
function isFormValid(){
    let isValid = true;
    
    // Clear all validation messages first
    document.querySelectorAll(".validationFdbk").forEach(div => {
        div.innerText = "";
    });
    
    // Loop through questions 1, 2, 3, 4, 6, 7, 8
    let textQuestions = [1, 2, 3, 4, 6, 7, 8];
    
    for(let i = 0; i < textQuestions.length; i++){
        let questionNum = textQuestions[i];
        let input = document.querySelector(`#q${questionNum}`);
    
        if(input && input.value.trim() == ""){
            isValid = false;
            // Use data-question attribute to find the correct validation div
            let validationDiv = document.querySelector(`.validationFdbk[data-question="${questionNum}"]`);
        
            if(validationDiv){
            validationDiv.innerText = `Question ${questionNum} cannot be left blank.`;
        }
    }
}
    
    let q5Select = document.querySelector("#q5");
    if(q5Select && q5Select.value == ""){
        isValid = false;
        let validationDiv = document.querySelector('.validationFdbk[data-question="5"]');
        if(validationDiv){
            validationDiv.innerText = "Question 5 cannot be left blank.";
        }
    }
    
    // Individual check for Question 9 (checkboxes)
    let jacksonchecked = document.querySelector("#Jackson").checked;
    let franklinchecked = document.querySelector("#Franklin").checked;
    let jeffersonchecked = document.querySelector("#Jefferson").checked;
    let washingtonchecked = document.querySelector("#Washington").checked;
    
    if(!jacksonchecked && !franklinchecked && !jeffersonchecked && !washingtonchecked){
        isValid = false;
        let validationDiv = document.querySelector('.validationFdbk[data-question="9"]');
        if(validationDiv){
            validationDiv.innerText = "Question 9 cannot be left blank.";
        }
    }
    
    // Individual check for Question 10 (radio buttons)
    let q10Radio = document.querySelector("input[name=q10]:checked");
    if(!q10Radio){
        isValid = false;
        let validationDiv = document.querySelector('.validationFdbk[data-question="10"]');
        if(validationDiv){
            validationDiv.innerText = "Question 10 cannot be left blank.";
        }
    }
    
    return isValid;
}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML="Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white p-2";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Correct'>";
    score += 10;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML="Incorrect.";
    document.querySelector(`#q${index}Feedback`).className = "bg-danger text-white p-2";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='Incorrect'>";
}