import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

    function handleLogout(){
        const userData = {
            email: localStorage.getItem("email"),
            session_token: localStorage.getItem("token"),
        };
    
    axios.post('http://127.0.0.1:8000/users/logout/', userData)
    .then(response => {
        console.log("Logged out");
    })
    .catch(error => {
      console.log(error.data);
    });
    }


    return ( 
        <div className="navbar">
            <div className="logo">
                <img src="/final.png" alt="logo" />
            </div>

            <div className="title">
            <h1 style={{marginLeft : '250px'}}>NutrixLive</h1>
            </div>

            <div className="links">
                <Link to="/home">Home</Link>
                <Link to="/AboutUs">About us</Link>
                <Link to="/contact">Contact us</Link>
                <Link to="/login"  className="more" onClick={handleLogout}style={{
                    backgroundColor : '#c63527',
                    borderRadius : '8px',
                    color : 'white',
                    marginRight : '20px'
                }}>Log out</Link>
                {/* <button onClick={handleLogout}>Log out</button> */}
            </div>
        </div>
     );
}
 
export default Navbar;