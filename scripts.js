/*Search Bar Functionality*/
function handleSearch(){
    const searchQuery = document.getElementById('searchQuery').value.toLowerCase(); //get input value
    
    //redirect based on keywords
    if(searchQuery.includes("class") || searchQuery.includes("boxing") ||
        searchQuery.includes("yoga") || searchQuery.includes("pilates") ||
        searchQuery.includes("hiit") || searchQuery.includes("water") || 
        searchQuery.includes("dance") || searchQuery.includes("aerobics") ||
        searchQuery.includes("zumba") || searchQuery.includes("jazzercise")
    ){
        window.location.href = "/classes"; //redirect to classes
    }
    else if(searchQuery.includes("hours") || searchQuery.includes("childcare") ||
        searchQuery.includes("operation") || searchQuery.includes("contact") 
        ){
        window.location.href = "/landing"; //redirect to landing page
    }
    else if(searchQuery.includes("log") || searchQuery.includes("account") ||
    searchQuery.includes("create")
        ){
        window.location.href = "/login"; //redirect to login page
    }

}