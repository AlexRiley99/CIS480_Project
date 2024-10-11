//Log in button handler
function LogIn(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const myUsername = "AlexR99";
    const myPassword = "Password1";

    if(username === myUsername && password === myPassword){
       window.location.href = "../AccountPage/Account.html";
    }
    else{
        document.getElementById('error').textContent = "*Username and/or password is incorrect. Please try again."
    }

}