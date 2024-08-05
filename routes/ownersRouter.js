const express=require("express");
const router=express.Router()
const env=require("dotenv")
const config=require("config")

const ownerModel=require("../models/owner-model")
router.get("/admin",function(req,res){
    let success=req.flash("success")
    res.render("createproducts",{success})
})
console.log(`${config.get("NODE_ENV")}`)

if(`${config.get("NODE_ENV")}`=== "development"){
    router.post("/create",async function(req,res){
        let owner=await ownerModel.find()
        if(owner.length > 0 ){
            return res
            .status(504)
            .send("You don't have permissions to create an owner")
        } 
        let {fullname,email,password,gstin}=req.body
        let createdOwner=await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    })
}

module.exports=router