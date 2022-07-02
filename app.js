require('dotenv').config()
const express = require('express')
const connectDB = require('./DB/connection')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const path = require("path")
const app = express()
const port = process.env.PORT
const indexRouter = require("./module/index.router")
app.use(express.urlencoded({ extended: true }))
app.use("/uploads" , express.static(path.join(__dirname,'./uploads')))
var store = new MongoDBStore({
    uri: process.env.DBURL,
    collection: 'mySessions'
  });
  
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store
}))

app.use(flash())
app.set('views', 'views')
app.set("view engine", 'ejs')
app.use(indexRouter.authRouter)
app.use(indexRouter.postRouter)
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))