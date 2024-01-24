import { useState } from "react";

let heightt = "";
let weightt = "";

const WorkoutForm1 = () => {


    const [height , setHeight] = useState('');
    const [weight , setWeight] = useState('');

    function handleHeight(e) {
        setHeight(e.target.value);
        heightt = e.target.value;
    }

    function handleWeight(e) {
        setWeight(e.target.value);
        weightt = e.target.value;
    }






    return ( 
        <div className="diet-form">
        <h1>
            Basic Info
        </h1>
    <form>
            <label for="height">Height:</label>
            <input type="number" id="height" min="0" className="diet-form-textBox" placeholder='Enter Your Height (cm)' value={height} onChange={(e) => handleHeight(e)} required/>
            <label for="weight">Weight:</label>
            <input type="number" id="weight"  min="0" className="diet-form-textBox" placeholder='Enter Your Weight (kg)' value={weight} onChange={(e) => handleWeight(e)} required/>
        {/* <label for= "goal">Goal:</label>
        <div className="diet-form-radiobuttons">
            <label htmlfor="shred">
                <input type="radio" name="goal" id="shred" value="shred" checked/> 
                Shred
            </label>
            <label htmlfor="bulk">
                <input type="radio" name="goal" id="bulk" value="bulk" /> 
                Bulk
            </label>
        </div> */}





    </form>

   </div>

     );
}
 
export default WorkoutForm1;
export {heightt , weightt};