const express=require('express')
const app=express()
const bodyparser=require('body-parser');
const path = require('path');
const dbo=require('./models/db')
const Objectid=dbo.ObjectId;

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',async(req,res)=>{
    let database= await dbo.getDatabase()
    const collections=await database.createCollection("content");
    const cursor=collections.find({})
    let arrayData=await cursor.toArray()
    let Title="TO DO LIST"
    let nodata="No Data"
    let edit_id,editList;
    if(req.query.edit_id){
        edit_id=req.query.edit_id;
        editList=await collections.findOne({_id:new Objectid(edit_id)})
    }else if(req.query.delete_id){
        await collections.deleteOne({editList})
        return res.redirect('/')
    }
    res.render('index',{Title,arrayData,edit_id,editList,nodata})
});

app.post('/sendData',async(req,res)=>{
    let database = await dbo.getDatabase()
    const collections=await database.createCollection("content");
    const listData={
        name:req.body.listData
    }
    await collections.insertOne(listData);
    return res.redirect('/');
})

app.post('/updateData/:edit_id',async(req,res)=>{
    let database = await dbo.getDatabase()
    const collections=await database.createCollection("content");
    const listData={
        name:req.body.listData
    }
    const edit_id = req.params.edit_id;
    await collections.updateOne({_id: new Objectid(edit_id)},{$set:listData})
    return res.redirect('/');
})
const PORT=3000
app.listen('3000',()=>{
    console.log(`The Port is listening on http://localhost:${PORT}`);
})