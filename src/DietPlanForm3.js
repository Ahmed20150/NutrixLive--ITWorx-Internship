import { useState } from "react";
import{h,w,dw,goall} from "./DietPlanForm1";
import {al,dis} from "./DietPlanForm2";
import { email2 } from "./LoginForm";
import axios from 'axios';


let ac="";
let no="";
let favProtein="";



const DietPlanForm3 = () => {

    const [acc,setAc]=useState('');
    const [noo,setNo]=useState('');
    const[favProteinn,setfavProteinn]= useState('');
    const[favCarbb,setfavCarbb]= useState('');


    function handleAc(e){
        setAc(e.target.value)
        ac=e.target.value;
        
    }
    function handleNo(e){
        setNo(e.target.value);
        no=e.target.value;
    }
    function handleProtein(e){
        setfavProteinn(e.target.value);
        favProtein=e.target.value;
    }
    

    

    function handleDietPlan3(e) {
        ac=acc;
        no=noo;

    }




    return (  
        <div className="diet-form">

            <h1 >
                Details
            </h1>
        <form onSubmit={handleDietPlan3}>
                <label htmlFor="meals">Number of Meals:</label>
                <input type="text" id="meals"  className="diet-form-textBox" placeholder='Enter Number of Meals' value={noo} onChange={(e) => handleNo(e)}/>



                <label htmlFor="ActivityLevel">Activity Level:</label>
                <select id="ActivityLevel" className="diet-form-textBox" value={acc} onChange={(e)  => handleAc(e)} >
                    <option value="" disabled>!--Choose your Level!--</option>
                    <option value="notActive">Sedentary</option>
                    <option value="LightlyActive">Lightly Active</option>
                    <option value="ModeratelyActive">Moderately Active</option>
                    <option value="VeryActive">Very Active</option>
                </select>

                <p>The selected activity level is: {acc}</p>
    

                <label htmlFor="favProtein">Favorite Source of Protein:</label>
                <select id="favProtein" className="diet-form-textBox" value={favProteinn} onChange={(e)  => handleProtein(e)} >
                    <option value="" disabled>!--Choose your Favorite!--</option>
                    <option value="Meat">Meat</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Fish">Fish</option>
   
                    

                </select>

                


        </form>

       </div>


    );
}
 
export default DietPlanForm3;
export{no,ac,favProtein};