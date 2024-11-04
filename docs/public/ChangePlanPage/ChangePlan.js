// Function to check the current plan and disable the select element if the user has a plan with a contract
function checkCurrentPlan() {
    const currentPlan = document.getElementById('currentPlan').textContent.trim();
    const changingToSelect = document.getElementById('changingTo');

    if (currentPlan === 'Platinum' || currentPlan === 'Diamond') {
        changingToSelect.disabled = true; // Disable the select element
    } else {
        changingToSelect.disabled = false; // Enable the select element
    }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', () => {
    checkCurrentPlan();
});