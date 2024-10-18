/******************************************
 * Similar to styles.css, this JavaScript file is only for things that pertain to
 * all pages, such as the search bar
 */
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
        searchQuery.includes("zumba") || searchQuery.includes("jazzercise") && currentPath.includes(index.html)
    ){
        if(!currentPath.includes("index.html")){//Different path to Classes.html if user is not using search bar on Home page
            window.location.href = "../ClassesPage/Classes.html";
        }
        else if(!currentPath.includes("Classes.html")){
            window.location.href = "ClassesPage/Classes.html"; //redirect to classes
        }
        else{
            Message.textContent = "*Result for that search term can be found on the page that you are currently visiting";
        }
    }
    else if(searchQuery.includes("hours") || searchQuery.includes("childcare") ||
        searchQuery.includes("operation") || searchQuery.includes("contact") 
        ){
            if(!currentPath.includes("index.html")){
                window.location.href = "../index.html"; //redirect to landing page
            }
            else{
                Message.textContent = "*Result for that search term can be found on the page that you are currently visiting";
            }
    }
    else if(searchQuery.includes("log") || searchQuery.includes("account") ||
    searchQuery.includes("create")
        ){
            if(!currentPath.includes("index.html")){//Different path to Classes.html if user is not using search bar on Home page
                window.location.href = "../LoginPage/Login.html";
            }
            else if(!currentPath.includes("Login.html")){
                window.location.href = "LoginPage/Login.html"; //redirect to classes
            }
            else{
                Message.textContent = "*Result for that search term can be found on the page that you are currently visiting";
            }
        
    }
    else{
        Message.textContent = "*No results found"
    }

}