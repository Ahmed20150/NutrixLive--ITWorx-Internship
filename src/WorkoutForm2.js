import React, { useState } from "react";

    let locationn = "";
    let injuryy = "";
    let goall="";


const WorkoutForm2 = () => {
    const [location , setlocation] = useState("");
    const [injury , setInjury] = useState("");
    const [goal , setGoal] = useState("");

    function handleLocation(e) {
        setlocation(e.target.value);
        locationn = e.target.value;
    }

    function handleInjury(e) {
        setInjury(e.target.value);
        injuryy = e.target.value;
    }
    function handleGoals (e){
        setGoal(e.target.value);
        goall = e.target.value;
    }
    

    return ( 
        <div className="diet-form">

        <h1>
            Likes & Dislikes
        </h1>
    <form>
            <label for= "location" style={{marginLeft : '50px' , marginBottom : '15px'}}>Workout to be at:</label>
        <div className="diet-form-radiobuttons">
            <label htmlfor="home">
                <input type="radio" name="location" id="home" value="home" onChange={(e) => handleLocation(e)} style={{}}/> 
                Home
            </label>
            <label htmlfor="gym">
                <input type="radio" name="location" id="gym" value="gym" onChange={(e) => handleLocation(e)}/> 
                Gym
            </label>
        </div>
            <label for="injury">Injuries/surgeries:</label>
            <textarea type="text" id="injury"  className="diet-form-textBox" placeholder='Please provide details of any current injuries/surgeries done before' style={{height : '90px'}} onChange={(e) => handleInjury(e)}/>

            <label for="goal">Goal:</label>
            <textarea type="text" id="injury"  className="diet-form-textBox" placeholder='Please specify your goal. ex: weight loss, muscle gain , etc' style={{height : '90px'}} onChange={(e) => handleGoals(e)}/>


    </form>

   </div>
     );
}
 
export default WorkoutForm2;
export {locationn , injuryy, goall};