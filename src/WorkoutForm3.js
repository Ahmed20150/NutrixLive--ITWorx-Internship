import { useState } from "react";

let workoutss = "";
let focuss = "";


const WorkoutForm3 = () => {

    const [workouts , setWorkouts] = useState("");
    const [focus , setFocus] = useState("");

    function handleWorkouts(e) {
        setWorkouts(e.target.value);
        workoutss = e.target.value;
    }

    function handleFocus(e) {
        setFocus(e.target.value);
        focuss = e.target.value;
    }


    return ( 
        <div className="diet-form">

            <h1 >
                Workout Specifics
            </h1>
        <form>
                <label for="workouts">Number of Workouts/Week:</label>
                <input type="number" id="workouts" min="1" className="diet-form-textBox" placeholder='Enter Workouts needed/week' style={{ fontSize: '14px' }} onChange={(e) => handleWorkouts(e)}/>
                <label for="focus">Focus on:</label>
                <select  id="focus"  className="diet-form-textBox" onChange={(e) => handleFocus(e)}>
                    <option value="" disabled>--Select your preference--</option>
                    <option value="upper">Upper body</option>
                    <option value="lower">Lower body</option>
                    <option value="all">Both</option>
                </select>
                {/* <label for="favorite">Favorite Workout:</label>
                <select id="favorite" className="diet-form-textBox" >
                    <option value="">--Choose your Favorite!--</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Legs">Legs</option>
                </select> */}





        </form>

       </div>
     );
}
 
export default WorkoutForm3;
export {focuss , workoutss};