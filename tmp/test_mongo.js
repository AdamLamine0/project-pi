const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://malekbaouindi_db_user:e4LYQ9nEsmldmCYo@cluster0.wpulfjf.mongodb.net/community_db?appName=Cluster0";

async function run() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    
    const db = client.db("community_db");
    const collection = db.collection("opportunities");
    const count = await collection.countDocuments();
    console.log(`The opportunities collection has ${count} documents.`);
    
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await client.close();
  }
}

run();
