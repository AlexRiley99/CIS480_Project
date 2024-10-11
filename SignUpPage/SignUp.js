//*The password requirement code is a work in progress

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const lengthReq = document.getElementById('lengthReq');    
const upperReq = document.getElementById('upperReq');
const lowerReq = document.getElementById('lowerReq');
const numReq = document.getElementById('numReq');
const specCharReq = document.getElementById('specCharReq');

    //Check password requirements
    function checkPassword(passwordInput, confirmPasswordInput, event){
        event.preventDefault();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if(password != null){
            //Check that input meets requirements
            const lengthRequirement = password.length >= 8;
            const uppercaseRequirement = /[A-Z]/.test(password);
            const lowercaseRequirement = /[a-z]/.test(password);
            const numberRequirement = /[0-9]/.test(password);
            const specialCharRequirement = /[!@#$%^&*]/.test(password);
        }
        else{

        }

        //Check that password and confirm password match
        if(confirmPassword.value === password){
            return; //Exit function if passwords match
        }
        else{
            document.getElementById('error').textContent = "*Passwords do not match";
        }
    }

//Listener for sign up button
document.getElementById('signUp').addEventListener('click', checkPassword);
