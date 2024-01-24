import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { createContext} from 'react';


    
    

let firstName ="";
let isLoggedIn=false;
// let email2="AAAAAAAAAAAAAAA";

const LoginForm = () => {
    

    const [user , setUser] = useState('');
    const [pass , setPass] = useState('');
    const [rememberMe , setRememberMe] = useState('');
    // const [isLoggedIn , setLogin] = useState(false);
    const [error, setError] = useState(""); // State for error message


    const navigate = useNavigate();



    function MyAlert(message){
        alert(message);
    }
    
    
    function handleLogin(e) {
        e.preventDefault();
        
        const loginFormData = {
            email: user,
            password: pass,
        };
        

        axios.post('http://127.0.0.1:8000/users/login/', loginFormData)
        .then(response => {
        if(response.data["message"] !== "User logged in successfully"){
            // MyAlert(JSON.stringify(response.data));
            setError("Invalid Email or Password!");

        }
          console.log(response.data);

          if (response.data["message"] === "User logged in successfully" ){
            localStorage.setItem("name",response.data.first_name);
            localStorage.setItem("token",response.data.session_token); 
            localStorage.setItem("email",response.data.email);
            
            
            navigate('/home', { state: { firstName } });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
              

    }

    return ( 
        // <SessionContext.Provider value={{ isLoggedIn, handleLogin }}>
        <div className="client-info">
        <form onSubmit={handleLogin}>
            <div className="client-name">
            <label htmlFor="name">Email: </label>
            <input type="email" id='name' value={user} onChange={(e) => setUser(e.target.value)} required/>
            </div>
            <div className="client-age">
            <label htmlFor="pass">Password:</label>
            <input type="password" id='pass' value={pass} onChange={(e) => setPass(e.target.value)} required/>
            </div>


            <button type="submit" className="form-button" >Login</button>

            {error && <div className="error-message" style={{color:'red',marginTop:'10px',fontSize:'16px'}}>{error}</div>}

            

            <div className="text">
                <p>Don't have an account yet? <Link to="/register">Register here</Link></p>
            </div>
            

        </form>
    </div>

    //  </SessionContext.Provider>

     );
}
 
export default LoginForm;
export {firstName};
export {isLoggedIn};
// export {email2};
