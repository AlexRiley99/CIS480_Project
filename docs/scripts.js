/*Search Bar Functionality*/
function handleSearch(){
    let searchQuery = document.getElementById('searchQuery').value.toLowerCase(); //get input value
    
    //redirect based on keywords
    if(searchQuery.includes("class") || searchQuery.includes("boxing") ||
        searchQuery.includes("yoga") || searchQuery.includes("pilates") ||
        searchQuery.includes("hiit") || searchQuery.includes("water") || 
        searchQuery.includes("dance") || searchQuery.includes("aerobics") ||
        searchQuery.includes("zumba") || searchQuery.includes("jazzercise")
    ){
        window.location.href = "/ClassesPage/Classes.html"; //redirect to classes
    }
    else if(searchQuery.includes("hours") || searchQuery.includes("childcare") ||
        searchQuery.includes("operation") || searchQuery.includes("contact") 
        ){
        window.location.href = "../index.html"; //redirect to landing page
    }
    else if(searchQuery.includes("log") || searchQuery.includes("account") ||
    searchQuery.includes("create")
        ){
        window.location.href = "/login"; //redirect to login page
    }
    else{
        let noResult = document.getElementById('noResult');
        noResult.textContent = "No results found"
    }

}