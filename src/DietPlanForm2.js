import { useState } from "react";

let al="";
let dis="";


const DietPlanForm2 = () => {

    const [all,setAl]=useState('');
    const [diss,setDis]=useState('');
    


    
    function handleAl(e){
        setAl(e.target.value)
        al=e.target.value;
        
    }
    function handleDis(e){
        setDis(e.target.value);
        dis=e.target.value;
    }
   


    return ( 
        <div className="diet-form">

            <h1>
                Allergies & Dislikes
            </h1>
        <form >
                <label htmlFor="allergies">Allergies:</label>
                <input type="text" id="allergies"  className="diet-form-textBox" placeholder='Enter Any Allergies'  value={all} onChange={(e) => handleAl(e)} required/>
                <label htmlFor="dislikes">Dislikes:</label>
                <input type="text" id="dislikes"  className="diet-form-textBox" placeholder='Enter Your Dislikes'  value={diss} onChange={(e) => handleDis(e)} required/>

            
        </form>

       </div>

     );
}
 
export default DietPlanForm2;
export {al,dis};