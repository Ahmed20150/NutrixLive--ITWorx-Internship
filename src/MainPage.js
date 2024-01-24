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




const MainPage = () => {

    

    const navigate = useNavigate();
    const location = useLocation();
    // const firstName = location?.state?.firstName || '';
    
    useEffect(() => {
        const element = document.querySelector('.fade-in');
        element.classList.add('active');
        
        document.body.classList.add('home-page'); // Add the class 'home-page' to the body
        
        return () => {
          element.classList.remove('active');
          document.body.classList.remove('home-page'); // Remove the class on component unmount
        };
      }, []);
        
   

    const[workoutText, setWorkoutText]= useState("Workout Plan")
    const[dietText, setDietText]= useState("Diet Plan")
    const[medText, setMedText]= useState("Medical Diagnosis")



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
        navigate('/home');
    }
    })
    .catch(error => {
      console.log(error.data);
    });

    }
    useEffect(() => {
        checkLogin();
      }, []);

    

    return ( <div className='all-mainpage'>
                     <Navbar />
                     


        
             <div className="widgets"> 
                 <div className="mainText">
                     <h1 className='fade-in'> Welcome, {localStorage.getItem("name")}! </h1>          
                     <h2>Choose your desired Service:</h2>
                  </div>  
     
                 <div className="widget-buttons">
                 <div className="workout" onMouseEnter={()=> setTimeout(() =>{setWorkoutText("Create your own custom Workout plan!");},50)} 
                     onMouseLeave={()=>setWorkoutText("Workout Plan")} >
                         <Link to='/workoutPlan' className='link'><button className="widg-button" > {workoutText}</button> </Link>
                 </div>
     
                 <div className="diet_plan" onMouseEnter={()=> setTimeout(() =>{setDietText("Create your own custom Diet plan!");},50)} 
                     onMouseLeave={()=>setDietText("Diet Plan")} 
                      >
                     <Link to='/dietPlan' className='link'><button className="widg-button" > {dietText}</button> </Link>
                 </div>
     
     
                 <div className="diagnosis" onMouseEnter={()=> setTimeout(() =>{setMedText("Log your symptoms and get a perscription");},50)}
                     onMouseLeave={()=>setMedText("Medical Diagnosis")}>
                     {/* <Link to='/medicalDiagnosis' className='link'><button className="widg-button">{medText}</button> </Link> */}
                 </div>
                 </div>
                 </div>


       
           
        </div>  
   );
}



 
export default MainPage;