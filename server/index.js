const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const conversationRouter = require('./routes/conversationRouter')
const messageRouter = require('./routes/messageRouter')
const userRouter = require('./routes/userRouter')

const app = express();
require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/conversations', conversationRouter)
app.use('/messages', messageRouter)
app.use('/user', userRouter)

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