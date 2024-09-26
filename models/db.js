const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
const ObjectId= mongodb.ObjectId;

let database;

async function getDatabase(){
    const client=await MongoClient.connect("mongodb://localhost:27017/");
    database=client.db("Todolist");
    if(!database){
        console.log("The Database is Not Connected");
    }
    return database
}

module.exports={getDatabase,ObjectId}