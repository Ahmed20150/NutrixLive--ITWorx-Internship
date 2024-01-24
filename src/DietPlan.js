import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import MainPage from './MainPage';
import { Link } from 'react-router-dom';
import React, { useState , useEffect} from 'react';
import Navbar from './Navbar';
import { isLoggedIn } from './LoginForm';  
import {finalDiet} from './NewDietPlan';
// import { email2 } from "./LoginForm";
import axios from 'axios';


let editt="";

const DietPlan = () => {

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
    navigate('/dietPlan');
}
})
.catch(error => {
  console.log(error.data);
});

}
useEffect(() => {
    checkLogin();
  }, []);


    const navigate = useNavigate();

    const emaill={
        email: localStorage.getItem("email"),
    };
   
    
    const [dd, setDd] = useState(finalDiet);
    const[edits,setEdits]= useState("");
    const[hide,setHide]= useState(false);

    function handleEdit(e){
      setEdits(e.target.value);
      editt=e.target.value;


  }


  function handleSub(){

    const followData = {
      email : localStorage.getItem("email"),
      oldPlan: dd,
      comment: editt,
  };

     console.log("waiting");
     navigate('/loading');
     axios.post('http://127.0.0.1:8000/nutritionTab/followUp/', followData ).then(
      
      response=>{
          setDd(response.data["message"]);    
          console.log("done");
          setTimeout(() => {
          navigate('/DietPlan'); // Navigate to '/DietPlan' route after response
          });

      }
    ).catch(error => {
      console.log(error.data);
     

    });


  }


    function handleClick(){
      if(hide){
        setHide(false);
      }
      else{
        setHide(true);
      }
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/nutritionTab/displayPlan/', emaill);
        if (response.data["message"] !== "firstTime") {
          setDd(response.data["message"]);
          console.log(response.data["message"]);
        }
        else {
          setDd("No previous plans available!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
        }, []);


        const createMarkup = () => {
          return { __html: dd }; // Use the dd value as HTML content
        };


    return ( 

        <div className='all'>
        <Navbar />
        <div className='mainText'> 
            <h1>
                DIET PLAN  
           </h1>
             <br></br>
             <Link to='/NewDietPlan' className='link'><button className='diet_plan' style = {{
                background : 'linear-gradient(109.6deg,  #fff 20.5%, #c63527 110.2%)'
             }}>CREATE A NEW PLAN</button></Link>
             <br></br><br></br>

             <div className="diet-form-textBox">
             <button className='diet_plan' style = {{
                background : 'linear-gradient(109.6deg,  #fff 20.5%, #c63527 110.2%)',
                marginBottom : '10px'
             }} onClick={handleClick}>Follow Up</button>                
             </div>

             <div className="diet-form-textBox">
             {hide && <form><textarea type="text" style = {{
                width: 300 ,
                height: 150 ,
             }}id="FollowUp" className="diet-form-textBox" placeholder='Enter Any Comments'  value={edits} onChange={(e) => handleEdit(e)}  />
             <button type="submit" className="diet_plan" onClick={handleSub} style = {{
                background : 'linear-gradient(109.6deg,  #fff 20.5%, #c63527 110.2%)',
                marginTop : '10px'
             }}> submit </button> </form>}
             </div>

             

             <div className="mainPlanText"dangerouslySetInnerHTML={createMarkup()} />


            </div>        
        </div>
     );
}
 
export default DietPlan;
export{editt};