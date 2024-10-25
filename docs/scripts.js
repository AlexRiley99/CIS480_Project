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
    ){//Redirect to Classes
            window.location.href = "ClassesPage/Classes.html";
    }
    else if(searchQuery.includes("hours") || searchQuery.includes("childcare") ||
        searchQuery.includes("operation") || searchQuery.includes("contact") 
        ){//Searches found on the Home page
        Message.textContent = "*Result for that search term can be found on the page that you are currently visiting";
    }
    else if(searchQuery.includes("log") || searchQuery.includes("account") ||
        searchQuery.includes("create") || searchQuery.includes("child") || 
        searchQuery.includes("manage") || searchQuery.includes("change") ||searchQuery.includes("edit")
        ){//Redirect to Login -- All pages for the above search results can only be accessed via a user account
            window.location.href = "LoginPage/Login.html";
        }
    else if(searchQuery.inclues("plan") || searchQuery.includes("membership") || searchQuery("sign")){//Redirect to Plans
        window.location.href = "PlansPage/Plans.html";
    }
    else if(searchQuery.includes("who") || searchQuery.includes("what") || searchQuery.includes("where")
        || searchQuery.includes("when") || searchQuery.includes("why") || searchQuery.includes("how")){
            //Redirect to About page
        window.location.href = "AboutPage/About.html";
    }
    else{//No results found
        Message.textContent = "*No results found"
    }//End of if...else

}