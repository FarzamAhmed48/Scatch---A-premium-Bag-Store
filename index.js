const express=require("express");
const app=express();
const path=require("path")
const db=require("./config/mongooseConnection")
const ownersRouter=require("./routes/ownersRouter")
const usersRouter=require("./routes/usersRouter")
const productsRouter=require("./routes/productsRouter")
const mainRouter=require("./routes/index")
const cookieParser = require("cookie-parser");
const expressSession=require("express-session")
const flash=require("connect-flash")
require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")


app.use(express.Router())
app.use("/",mainRouter)
app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)



const PORT = 3000;
app.listen(PORT, () => {
});

