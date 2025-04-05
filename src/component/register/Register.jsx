import React, { useState } from "react";
// import "./register.css";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
    const[role,setRole]=useState("seeker")
  


  const handelForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!firstName || !lastName || !password || !email || !number || !confirmPassword || !role) {
      setErr("All field  are required");
      setLoading(false); // Stop loading
    } else if (password.length < 4) {
      setErr("Password Must be at least 4 char");
      setLoading(false); // Stop loading
    }else if(password !== confirmPassword){
      setErr("Password and Confirm Password do not match")
      setLoading(false); // Stop loading
       return
    } else {
      setErr("");
      const userdata = {
        firstName,
        lastName,
        email,
        password,
        number,
        role,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          userdata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setSuccess("Signup Successful");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setNumber("");
          setRole("")

          // //redirect
          setTimeout(()=>{
            navigate("/login");
          },1500)
        } else {
          setErr(response.data.message || "Signup Failed");
        }
      } catch (error) {
        setErr(error.response?.data?.message || "Error submitting the form. Please try again.");
      } finally {
        setLoading(false); // Stop loading once the request finishes
      }
    }
  };

  return (
    <div className="mainsingup">
      <form onSubmit={handelForm}>

        <div className="registerBox">
          <div className="signup">
            <h2>Signup</h2>
          </div>
          <div className="fields">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="fields">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="fields">
            <label>Phone</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="fields">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="fields">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="fields">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
          </div>
          <div>
          <label>Select Role:</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="seeker">job seeker</option>
          <option value="poster">job Poster</option>
          </select>
          </div>
        </div>
        {err && <p style={{ color: "red" }}>{err}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {loading && <p className="text-green-500">Loading...</p>}
        <button
        // onClick={()=>{navigate("/login")}}
          type="submit"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Register;