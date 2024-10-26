
const {errorHandler} = require("Database/helpers");
const {uploadProcessedData} = require("Database/firebase");

async function handler(req, method){
    try{
        if(path === "/test-upload"){
                await uploadProcessedData();
                return "Success";
            }

            return "Hello Get";

        const {body} = req;
        if(body && body.message){
            const messageObj = body.message;
            await handleMessage(messageObj);
            return "Success";
        }

        return "Unknown request";
    }
    catch(error){
        errorHandler(error, "mainIndexHandler");
    }
}