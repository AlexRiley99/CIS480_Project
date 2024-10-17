/*Search Bar Functionality*/
function handleSearch(){
    let searchQuery = document.getElementById('searchQuery').value.toLowerCase(); //get input value
    const currentPath = window.location.pathname; //get current path
    let Message = document.getElementById('message');

    //redirect based on keywords
    if(searchQuery.includes("class") || searchQuery.includes("boxing") ||
        searchQuery.includes("yoga") || searchQuery.includes("pilates") ||
        searchQuery.includes("hiit") || searchQuery.includes("water") || 
        searchQuery.includes("dance") || searchQuery.includes("aerobics") ||
        searchQuery.includes("zumba") || searchQuery.includes("jazzercise")
    ){
        if(!currentPath.includes("Classes.html")){
            window.location.href = "ClassesPage/Classes.html"; //redirect to classes
        }
        else{
            Message.textContent = "Search result can be found on the page that you are currently visiting";
        }
    }
    else if(searchQuery.includes("hours") || searchQuery.includes("childcare") ||
        searchQuery.includes("operation") || searchQuery.includes("contact") 
        ){
            if(!currentPath.includes("index.html")){
                window.location.href = "index.html"; //redirect to landing page
            }
            else{
                Message.textContent = "Search result can be found on the page that you are currently visiting";
            }
    }
    else if(searchQuery.includes("log") || searchQuery.includes("account") ||
    searchQuery.includes("create")
        ){
            if(!currentPath.includes("index.html")){
                window.location.href = "LoginPage/Login.html"; //redirect to login page
            }
            else{
                Message.textContent = "Search result can be found on the page that you are currently visiting";
            }
        
    }
    else{
        Message.textContent = "No results found for that search term"
    }

}