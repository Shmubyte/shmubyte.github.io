displayStates();
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", suggestPassword);
document.querySelector("#suggestedPwd").addEventListener("click", changePassword);
document.querySelector("#signUpForm").addEventListener("submit", function(event){
    validateForm(event);
})

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    if(!data){
        document.querySelector("#zipStatus").textContent = "Zip Code not found.";
    }
    else{
    document.querySelector("#zipStatus").textContent = "";
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#Latitude").textContent = data.latitude;
    document.querySelector("#Longitude").textContent = data.longitude;
    console.log(data);
    }
    //alert(document.querySelector("#zip").value);
}
function displayStates(){
    const states = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas",
        "CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware",
        "FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois",
        "IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana",
        "ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan",
        "MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana",
        "NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey",
        "NM":"New Mexico","NY":"New York","NC":"North Carolina",
        "ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon",
        "PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina",
        "SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah",
        "VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia",
        "WI":"Wisconsin","WY":"Wyoming"};
    let stateList = document.querySelector("#state");
    for (let abbr in states){
        let i = 0;
        stateList.innerHTML += `<option value="${abbr}">${states[abbr]}</option>`;
        i++
    }
}
async function displayCounties(){
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML ="<option> Select One</option>";
    for(let i of data){
        countyList.innerHTML += `<option> ${i.county} </option>`;
    }
    console.log(data);
}
async function checkUsername(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch (url);
    let data = await response.json();
    let unameErr = document.querySelector("#usernameStatus") 
    if(username.length == 0){
        document.querySelector("#usernameStatus").value = "";
    }
    if(data.available){
        unameErr.innerHTML = "Username is Available";
        unameErr.style.color = "green";
    }else{
        unameErr.innerHTML = "Username is Not Available";
        unameErr.style.color = "red";
    }
}
function suggestPassword(){
    let passChars = ["QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm!@#$%^&*()"]
    let suggestedPwd = "";
    while(suggestedPwd.length < 10){
        let randomIndex = Math.floor(Math.random() * passChars[0].length);
        suggestedPwd += passChars[0].charAt(randomIndex);
    }
    document.querySelector("#suggestedPwd").innerHTML = suggestedPwd;
}
function changePassword(){
    let changePwd = document.querySelector("#suggestedPwd").innerHTML;
    document.querySelector("#password").value = changePwd;
}
function validateForm(e){
    e.preventDefault();
    let isValid = true;
    let uname = document.querySelector("#username").value;
    let unameErr = document.querySelector("#usernameStatus");
    let pwd = document.querySelector("#password").value;
    let pwd2 = document.querySelector("#password2").value;
    let pwdErr1 = document.querySelector("#passwordError1");
    let pwdErr2 = document.querySelector("#passwordError2");

    unameErr.innerHTML = "";
    pwdErr1.innerHTML = "";
    pwdErr2.innerHTML = "";

    if (uname.length == 0){
        unameErr.innerHTML = "Username cannot be empty.";
        unameErr.style.color = "red";
        isValid = false;
    }
    if(pwd.length < 6){
        pwdErr1.textContent = "Password must be atleast 6 characters.";
        pwdErr1.style.color = "red";
        isValid = false;
    }
    if(pwd != pwd2){
        pwdErr2.innerHTML = "Passwords do not match. Retype Password.";
        pwdErr2.style.color = "red";
        isValid = false;
    }
    if(isValid){
        document.querySelector("#signUpForm").submit();
    }
}