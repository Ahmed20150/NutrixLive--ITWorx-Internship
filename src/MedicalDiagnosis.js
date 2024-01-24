import  { useState , useRef} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Router } from 'react-router-dom';
import DietPage from './DietPlan';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { firstName } from './LoginForm';
import React, { useEffect } from 'react';
import {isLoggedIn} from './LoginForm';
import { email2 } from './LoginForm';
import { useAuth } from './AuthContext';
import axios from 'axios';





const MedicalDiagnosis = () => {
    const navigate = useNavigate();

    function checkLogin(){
        console.log("start")
    
        const userData = {
            email: localStorage.getItem("email"),
            session_token: localStorage.getItem("token"),
        };
    
    axios.post('http://127.0.0.1:8000/users/validateSession/', userData)
    .then(response => {
        console.log(response.data["isValid"]);
    
    if(response.data["isValid"] !== "True"){
            navigate("/");
    }
    else{
        navigate('/medicalDiagnosis');
    }
    })
    .catch(error => {
      console.log(error.data);
    });
    
    }
    useEffect(() => {
        checkLogin();
      }, []);
    

    return ( 
        <div className='all'>
            <Navbar />
        <div className='mainText'>
        <h1>
                COMING SOON!
            </h1>
            <div  className='mainText'>
             <Link to='/home' className='link'><button className='diet_plan' style={{
                background : 'linear-gradient(109.6deg,  #fff 20.5%, #c63527 110.2%)'
             }}>HOME</button></Link>
            </div>
            </div>
        </div>
     );
}
 
export default MedicalDiagnosis;