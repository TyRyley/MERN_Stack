import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Register from "./components/register"; 
import Login from "./components/login"
 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
     <Route exact path="/" element={<Login />} />
       <Route path="/recordList" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
     </Routes>
   </div>
 );
};
 export default App;