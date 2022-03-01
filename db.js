const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://piyush:Piyush2001@noteyard.24dyt.mongodb.net/test"
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;