// Obtaining the Express server which was configured in backend directory.
const server = require("./backend/server.js");

// Obtaining Port Number from an environment variable called PORT - if environment variable does not exist, then port number will default to 3000.
const port = process.env.PORT || 3000

// Activating the Express server to start listening on above mentioned port number.
server.listen(port, ()=>{
    console.log("Server is running on port: " + port);
})