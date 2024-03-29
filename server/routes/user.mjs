import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";

const router = express.Router();

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

// This section will help you create a new record.
router.post("/signup", async (req, res) => {
  const password = bcrypt.hash(req.body.password,10);
  console.log(password, "STORED");
  let newDocument = {
    name: req.body.name,
    password: (await password).toString()
  };
  let collection = await db.collection("user");
  let result = await collection.insertOne(newDocument);
  console.log(password);
  res.send(result).status(204);
});

router.post("/login", bruteforce.prevent, async (req, res) => {
  let password ="";
  try{
    password = req.body.password;
    let collection = await db.collection("user");
    console.log(collection);
    let result = await collection.findOne({name:req.body.name});
    console.log("The user you asked for is " ,result);

      if (!result)
      {
          return res.status(401).json({message: "Authentication failed 1"});
      }

      console.log("Password from request" + password);
      console.log("Password from DB", result.password.toString());    
      // compare the provided password with the hashed passsword in the database
      const passwordMatch = await bcrypt.compare(password.toString(),result.password.toString());

      /*if(!passwordMatch)
      {
          return res.status(401).json({message: "Authentication failed"});
      }*/

      // Authentication sucessfull
      const token = jwt.sign({name:req.body.name, password: req.body.password}, "this_secret_should_be_longer_than_it_is", {expiresIn: "1h"})
      console.log("your new token is", token)
      res.header("Authorization " + token);
      res.status(200).json({message: "Authentication successful"});
  }catch(error)
  {
      console.error("login error:", error);
      res.status(500).json({message: "Login failed"});
  }
  
});


// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  console.log(results)
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("user");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    password: req.body.password
  };
  let collection = await db.collection("user");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("user");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("user");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});


  
  
export default router;