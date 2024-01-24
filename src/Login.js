import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    return ( 
        <div className="login">
        {/* <div className="login-header">
            <div className="login-logo">
                <img src="/test3.jpg" alt="logo" />
            </div>
            <div className="login-title">
                <h1>NutriLive</h1>
            </div>
        </div> */}
        
        <div className="login-main">

        <div className="quote">
            <h2>Welcome to your favorite lifechanging platform</h2>
            <h3>Explore our different services, and get ready to change your life forever!</h3>
        </div>



            <LoginForm />
        
        
        </div>
        </div>
        
        
     );
}
 
export default Login;