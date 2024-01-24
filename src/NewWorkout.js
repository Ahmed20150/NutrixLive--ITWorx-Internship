import { Link , useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import { useState } from 'react';
import WorkoutForm1 from './WorkoutForm1';
import WorkoutForm2 from './WorkoutForm2';
import WorkoutForm3 from './WorkoutForm3';
import { useEffect } from 'react';
import {heightt , weightt} from './WorkoutForm1';
import {locationn , injuryy , goall} from './WorkoutForm2';
import {workoutss , focuss} from './WorkoutForm3';
import axios from 'axios';
// import { email2 } from './LoginForm';
 

let finalPlan="";

const NewWorkout = () => {
    const navigate = useNavigate();

    const [currentComp, setCurrentComp]= useState(0);
    const components= [WorkoutForm1,WorkoutForm2,WorkoutForm3];
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
        navigate('/NewWorkout');
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
        if (currentComp === 2) {
            if (currentComp ===2) {

            
            navigate('/loading'); // Navigate to '/loading' route immediately
            setIsLoading(true); // Show loading immediately
               }

        const workoutData = {
            email : localStorage.getItem("email"),
            height : heightt,
            weight : weightt,
            location : locationn,
            injuries : injuryy,
            workouts : workoutss,
            focus : focuss,
            goal: goall,
        };
        console.log(workoutData);
        console.log("waiting");
        axios.post('http://127.0.0.1:8000/workOutTab/Create_workout/' , workoutData).then (
            response => {
                console.log(response.data["message"]);
                finalPlan=response.data["message"];
                console.log("done");
                setTimeout(() => {
                    setIsLoading(false); // Hide loading after response
                    setCurrentComp(0); // Reset to the first component after response
                    navigate('/workoutPlan'); // Navigate to '/DietPlan' route after response
                  });
            }
            ).catch (error=> {
                console.log(error.data);
                setIsLoading(false);
            }
        );
        return;
        }


        setCurrentComp((currentComp + 1) % components.length);

      };


      const handleBackBtn = () => {
        if (currentComp === 0) {
            return;
        }
        else {
            setCurrentComp(currentComp -1);
        }
      }

      const CurrentComp= components[currentComp]

      let buttonText= "NEXT";

      if(currentComp===2){
        buttonText="GENERATE PLAN";
      }

    //   if(currentComp===3){
    //     navigate('/WorkoutPlan');
    //   }
    return ( 
        <div className='all'>
            <Navbar />
            <div className="mainText">
                <h1>
                    CREATE YOUR NEW WORKOUT PLAN!
                </h1>
                <h2>
                    Fill Your information below:
                </h2>
                <br></br>
                <div  className="diet-form">
                <CurrentComp/>
                </div>
            <br></br><br></br>
            <div className="Save">
            {/* <br></br> */}
            <button className='diet_plan' onClick={handleBackBtn} style ={{marginRight : '40px' ,
            color:'black',
            background : 'linear-gradient(109.6deg,  #fff 10.5%, #c63527 110.2%)'
            }}>Back</button>
            <button className='diet_plan' onClick={handleButtonClick} style ={{
                background : 'linear-gradient(109.6deg,  #fff 20.5%, #c63527 110.2%)'
            }}>{buttonText}</button>
        </div>


            </div>



        </div>
     );
}
 
export default NewWorkout;
export{finalPlan};