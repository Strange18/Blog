//connecting the database

//module that helps in connecting the database is mongoose
const mongoose = require('mongoose')

// defining an async function that will wait until the data 
// is fetched from the database
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;