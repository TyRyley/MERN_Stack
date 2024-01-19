//import { response } from "express";
import React, { useState } from "react";
import { useNavigate } from "react-router"; 
export default function Login() {
 const [form, setForm] = useState({
   name: "",
   password: "",
 }); 
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
// This function will handle the submission.
async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
  
    await fetch("http://localhost:5050/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).then((response)=>response.json()
    .then((data)=>
    {
      console.log(data, "DATAS");
      localStorage.setItem('token', JSON.stringify(data.token));
      console.log(data.token, "token");
    }))
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ name: "", password: ""});
    navigate("/recordList");
}
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Login</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
    
       <div className="form-group">
         <input
           type="submit"
           value="Login"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}