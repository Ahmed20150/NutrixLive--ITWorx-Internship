import React, { useState, useEffect } from 'react';
import DietPlanForm1 from './DietPlanForm1';
import DietPlanForm2 from './DietPlanForm2';
import DietPlanForm3 from './DietPlanForm3';
import Loading from './Loading';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import DietPlan from './DietPlan';
import{h,w,dw,goall} from "./DietPlanForm1";
import {al,dis} from "./DietPlanForm2";
import {ac,no,favProtein} from "./DietPlanForm3";
// import { email2 } from "./LoginForm";
import axios from 'axios';



let finalDiet="";


const NewDietPlan = () => {
  let [currentComp, setCurrentComp] = useState(0);
  const components = [DietPlanForm1, DietPlanForm2, DietPlanForm3];
  const[DietString, setDietString]= useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading as false

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
    navigate('/NewDietPlan');
}
})
.catch(error => {
  console.log(error.data);
});

}
useEffect(() => {
    checkLogin();
  }, []);

    const handleButtonClick = () => {

        if(currentComp===2){
          if (currentComp === 2) {
            navigate('/loading'); // Navigate to '/loading' route immediately
            
            setIsLoading(true); // Show loading immediately
      
           
               }
            const dietData = {
                email: localStorage.getItem("email"),
                height: h,
                weight:w,
                activity: ac,
                allergies: al,
                noMeals: no,
                desiredWeight : dw,
                favProtein: favProtein,
                dislikes: dis,
            };
            console.log(dietData);
            // console.log(email2);
            console.log("waiting");
            navigate('/loading');
            axios.post('http://127.0.0.1:8000/nutritionTab/createNutriplan/', dietData ).then(
                
                response=>{
                    console.log(response.data["message"]);
                    setDietString(response.data["message"]);
                    finalDiet=response.data["message"];
                    console.log("done");
                    setTimeout(() => {
                      setIsLoading(false); // Hide loading after response
                      setCurrentComp(0); // Reset to the first component after response
                      navigate('/DietPlan'); // Navigate to '/DietPlan' route after response
                    });
    
                }
            ).catch(error => {

                console.log(error.data);
                setIsLoading(false); // Hide loading in case of error

              });
              return;
    

        }


        setCurrentComp((currentComp + 1) % components.length);
      };

    
  

  const CurrentComp = components[currentComp];

  let buttonText = "NEXT";

  if (currentComp === 2) {
    buttonText = "GENERATE PLAN";
  }

  const handleBackBtn = () => {
    if (currentComp === 0) {
      return;
    } else {
      setCurrentComp(currentComp - 1);
    }
  };

  return (
    <div className="all">
      <Navbar />
      <div className="mainText">
        <h1>CREATE YOUR DIET PLAN!</h1>
        <h2>Fill Your Information Below:</h2>
        <br></br>
        <div className="Diet-form">
          <CurrentComp />
        </div>
        <div className="Save">
          <br></br>
          <button
            className="diet_plan"
            onClick={handleBackBtn}
            style={{
              marginRight: '40px',
              color: 'black',
              background:
                'linear-gradient(109.6deg,  #fff 10.5%, #c63527 110.2%)',
            }}
          >
            Back
          </button>
          <button
            className="diet_plan"
            onClick={handleButtonClick}
            style={{
              background:
                'linear-gradient(109.6deg,  #fff 20.5%, #c63527 110.2%)',
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDietPlan;
export {finalDiet};
