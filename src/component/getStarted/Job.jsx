import React, {useState} from 'react'
import './Job.css'
import { Link } from "react-router-dom";


const job = () => {
    const[isPopupOpen,setIsPopupOpen] = useState(false)

    const popup=()=>{
          setIsPopupOpen(!isPopupOpen)
    }
  return (
    <div className='job-main'>
    <div className='are-you' >
      <h2>Are you a</h2>
    </div>
    <div className='job'>
    <Link to="/login"><h2>Job Seeker</h2></Link>  
     <Link to="/login"><h2>Job Poster</h2></Link> 

       {/* <Link to='/login'>
            <button>Login </button>
            </Link> */}
    </div>
    {/* <div className='buttons'>
    <button className='login-button' onClick={popup}>Login</button>

    </div> */}

    {/* popup modal */}
    {isPopupOpen && (
        <div className='popup-overlay'>
            <div className='popup-content'>
             <h3>Login</h3>
             <button className="google-login">Sign Up with Google</button>
                        <button className="signin-button">Sign In</button>
                        <button className="create-account-button">Create Account</button>
                        <button className="close-button" onClick={popup}>
                            Close
                        </button>         
                           </div>
        </div>
    )}

  </div>
  )
}

export default job
