const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')

const app = express();
require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('DB connected');
        }).catch((e) => {
            console.log(e.message);
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server started on ${process.env.PORT}`);
        })
    } catch (e) {
        console.log(e.message);
    }
}

start()