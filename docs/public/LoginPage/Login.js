
//Log in button handler
function handleLogin(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const memberId = document.getElementById('memberid').value;

    const myUsername = "AlexR99";
    const myPassword = "Password1*";
    const myMemberId = "1";

    if(username === myUsername && password === myPassword && memberId === myMemberId){
       window.location.href = "../AccountPage/Account.html";
    }
    else{
        document.getElementById('error').textContent = "*Invalid username, password, or Member ID. Please try again.";
    }

}

