import React from "react";
import {useNavigate} from 'react-router-dom';


const Back = () => {
    const navigate = useNavigate();

    function handleBackButton() {
        navigate(-1);
    }

    return ( 
        <div>
      {/* Back Button */}
      <button className="back-button" onClick={handleBackButton}>
        Back
      </button>
      {/* Your component content */}
      {/* ... */}
    </div>
  
     );
}
 
export default Back;