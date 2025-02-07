const path = require("path")
const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const mongodb = require('mongodb').MongoClient;

require('./db/mongoose')
const userRouter = require('./routers/user');

const dbPort = process.env.MONGODB_PORT || 27017;
const dbUrl = "mongodb://127.0.0.1:" + dbPort;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicPath = path.join(__dirname,"..","..","public")
app.use(express.static(publicPath));
app.use(express.json());

app.use(userRouter);

app.get("/download", (req,res)=>{
    res.download(path.join(publicPath, "files/Manish_Varma_CV.pdf"));
})

app.get("/thankyou",(req,res)=>{
    res.sendFile(path.join(publicPath, "thankyou.html"));
})

// app.get("/console", (req,res)=>{
//     res.sendFile(path.join(publicPath, "main.html"));
// })

app.get("*", (req, res)=>{
    res.sendFile(path.join(publicPath, "main.html"))
})



io.on('connection', (socket)=>{

    socket.on("join", (isAdmin)=>{
        if(isAdmin) {
            socket.join("reception-room")
        } else {
            socket.join("feedback-room")
        }
    })

    socket.on("feedback", (feedback, callback)=>{
        mongodb.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true},(err, client)=>{
            if(!err){
                const db = client.db("visitors");
                const collection = db.collection("feedback");
                collection.insertOne(feedback).then(()=>{
                    client.close();
                    socket.broadcast.to("reception-room").emit("refresh");
                    callback(false);
                })
            } else {
                callback("ERROR: Feedback was NOT be submitted to the Database!")
            }
        })
    })

})

module.exports = server;
