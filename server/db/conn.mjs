import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const variable = "mongodb+srv://st10084621:tyry711062002@cluster911.ltc9pbu.mongodb.net/?retryWrites=true&w=majority"
console.log(variable);

//const variable = process.env.MONGO_CONN_STRING
//console.log(variable);

//console.log(connectionString);
//const connectionString = process.env.ATLAS_URI;
//console.log(connectionString);

const client = new MongoClient(variable);

let conn;
try {
  conn = await client.connect();
  console.log("successfully connected to Db")
} catch(e) {
  console.error(e);
}



  let db = conn.db("APDS_POE");



  export default db;