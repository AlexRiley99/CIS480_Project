function errorHandler(error, name, from){
    console.log("------------------START-----------------");
    console.log("Error occurred in " + name);

    if(from === "axios"){
        if(error.response){
            //Request was made and the server responded with a status
            //that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if(error.request){
            //Request was made but no response received
            console.log(error.request);
        }
        else{
            //Something happened in setting up the request
            console.log("Error", error.message);
        }
        console.log(error.toJSON());
    }
    else{
        console.log(error);
    }

    console.log("--------------------END-----------------");
}