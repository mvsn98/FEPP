const mongoose = require('mongoose')

const dbPort = process.env.MONGODB_PORT || 27017;
const dbUrl = "mongodb://127.0.0.1:" + dbPort + "/users";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})