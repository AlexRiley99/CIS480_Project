//Log in button handler
document.getElementById('loginBtn').addEventListener('click', LogIn);

function LogIn(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const myUsername = "AlexR99";
    const myPassword = "Password1*";

    if(username === myUsername && password === myPassword){
       window.location.href = "../AccountPage/Account.html";
    }
    else{
        document.getElementById('error').textContent = "*Username and/or password is incorrect. Please try again."
    }

}

/*Still figuring out the code below. I'm teaching Node.js to myself, so it's kind of trial and error
document.getElementById('loginBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send an AJAX request to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            return response.text(); 
        } else {
            return response.text().then(text => {
                throw new Error(text); 
            });
        }
    })
    .then(data => {
        console.log(data); 
        window.location.href = '/account'; 
    })
    .catch(error => {
        // Display error message
        document.getElementById('error').innerText = "*Invalid username or password";
    });
});
*/