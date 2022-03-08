import { Appwrite } from "appwrite";

// Init your Web SDK
const appwrite = new Appwrite();

appwrite
    .setEndpoint('https://appwrite.software-engineering.education/v1') // Your Appwrite Endpoint
    .setProject('62066432a2c67cb3f59e') // Your project ID
;

export {appwrite};