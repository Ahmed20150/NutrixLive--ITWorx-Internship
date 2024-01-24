import { useState } from "react";




let h="";
let w="";
let dw="";
let goall="";

const DietPlanForm = () => {

    const [hh,setH]=useState('');
    const [ww,setW]=useState('');
    const[dww,setDw]= useState('');
    const [goalll,setG]=useState('');



    function handleH(e){
        setH(e.target.value)
        h=e.target.value;
    }
    function handleW(e){
        setW(e.target.value);
        w= e.target.value ;
    }
    function handleDw(e){
        
        setDw(e.target.value);
        dw= e.target.value ;
    }




    function handleDietPlan1(e) {
        h=hh;
        w=ww;
        goall=goalll;

    }


    return ( 
        <div className="diet-form">
            <h1 className="fadeinText">
                Basic Info
            </h1>
        <form onSubmit={handleDietPlan1}>
                <label htmlFor="height">Height:</label>
                <input type="number" id="height" className="diet-form-textBox" placeholder='Enter Your Height(cm)'  value={hh} onChange={(e) => handleH(e)} required/>
                <label htmlFor="Currentweight">Current Weight:</label>
                <input type="number" id="weight"  className="diet-form-textBox" placeholder='Enter Your Weight(kg)'  value={ww} onChange={(e) => handleW(e)} required/>
                <label htmlFor="DesiredWeight">Desired Weight:</label>
                <input type="number" id="weight" className="diet-form-textBox" placeholder='Enter Your Desired Weight(kg)'  value={dww} onChange={(e) => handleDw(e)} required/>

           

            {/* <button type="submit" className="form-button" >next</button> */}



        </form>

       </div>

     );
}
 
export default DietPlanForm;
export {h,w,dw,goall};