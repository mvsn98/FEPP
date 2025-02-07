const express = require('express');
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');

const dbPort = process.env.MONGODB_PORT || 27017;
const dbUrl = "mongodb://127.0.0.1:" + dbPort;

const myEmail = "mvtinder98@gmail.com"

const transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: myEmail,
		pass: process.env.EMAIL_PASSWORD
	}
});

const message = {
	from: myEmail,
	to: "",
	subject: "",
	text: ""
};

const User = require('../models/user')
const auth = require('../middleware/auth')
const authEdit = require('../middleware/authEdit')
const router = new express.Router()

router.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.send();
    } catch (e) {
        res.send({ error: 'This user account already exists. Please choose a different name!' })
    }
})

router.post('/users/auth', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.name, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.send()
    }
})

router.post("/users/forgotpassword", async (req,res)=>{
    const user = await User.findOne({name: req.body.name});
    if(!user){
        res.send({ error: 'User was not found!' });
    } else {
        try {
            const newPassword = uuidv4().split("-").join("");
            user.password = newPassword;
            await user.save();
            message.to = user.email;
            message.subject = "Team Manish Varma | Your new Password"
            message.text = `Hi, ${user.name}, Your New Password is: ${newPassword} . - Team Manish Varma`;
            transport.sendMail(message, function(err){
                if(err){
                    res.send({ error: 'This service is unavailable!' });
                }
                res.send();
            });
        } catch(e){
            res.send({ error: 'This Service is Unavailable!' });
        }
    }
})

router.post("/users/getfeedback", auth, (req,res)=>{
    mongodb.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true},(err, client)=>{
        if(!err){
            const db = client.db("visitors");
            const collection = db.collection("feedback");
            collection.find({_id: {$exists: true}}).toArray().then((arr)=>{
                res.status(200).send({feedbacks: arr});
                client.close();
            })
        } else {
            res.status(503).end();
        }
    })
})

router.post("/users/deletefeedback", auth, (req,res)=>{
    mongodb.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true},(err, client)=>{
        if(!err){
            const db = client.db("visitors");
            const collection = db.collection("feedback");
            collection.deleteOne({message: req.body.message}).then((err, collection)=>{
                if(!err){
                    res.send();
                } else {
                    res.send({ error: 'This service is unavailable!' });
                }
                client.close();
            })
        } else {
            res.send({ error: 'This service is unavailable!' });
        }
    })
})

router.post('/users/reply', auth, async (req, res)=>{
    mongodb.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true},(err, client)=>{
    const db = client.db("visitors");
    const collection = db.collection("feedback");
    if(!err){
        if(req.body.replyDetails.replyObj.title !== ''){
            message.subject = req.body.replyDetails.replyObj.title;
            message.text = req.body.replyDetails.replyObj.reply;
            message.to = req.body.replyDetails.email;
            transport.sendMail(message, function(err){
                if(err){
                    res.send({ error: 'This service is unavailable!' });
                } else {
                    collection.updateMany({ email: req.body.replyDetails.email }, { $set: { answered: true } }).then(()=>{
                        client.close();
                        res.send();
                    })
                }
            });
        } else {
                    collection.findOne({ email: req.body.replyDetails.email }).then((user)=>{
                        message.subject = `Re: Addressing ${user.name}'s concerns.`
                        message.text = req.body.replyDetails.replyObj.reply;
                        message.to = req.body.replyDetails.email;
                        transport.sendMail(message, function(err){
                            if(err){
                                res.send({ error: 'This service is unavailable!' });
                                client.close();
                            }
                            collection.updateMany({ email: req.body.replyDetails.email }, { $set: { answered: true } }).then(()=>{
                                res.send();
                                client.close();
                            })
                        });
                    })
                } 
        } else {
                res.send({ error: 'This service is unavailable!' });
        }
    })  
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/edit', authEdit, async (req, res) => {
    delete req.body.currentName;
    let allowedUpdates;
    if(req.body.email!==''){
        allowedUpdates = ['name', 'password','email']
    } else {
        delete req.body.email;
        allowedUpdates = ['name', 'password']
    }
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.send({ error: 'Update could not be applied!' })
    }
})

router.post('/users/delete', authEdit, async (req, res) => {
    try {
        await req.user.remove()
        res.send();
    } catch (e) {
        res.send({ error: 'Deletion could not be performed!' })
    }
})

module.exports = router