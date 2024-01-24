// const AboutUs = () => {
//     return ( 
//         <div className="about-us">
//             <p>
//             Welcome to our lifestyle company! We are a team of dedicated professionals who are passionate about helping people achieve their health and fitness goals. Our company offers a wide range of services, including personalized workout and nutrition plans, to help you reach your full potential.
// At our core, we believe that everyone deserves access to the tools and resources they need to live a healthy and fulfilling life. That’s why we work hard to make our services affordable and accessible to people all over the world. Whether you’re just starting out on your fitness journey or you’re a seasoned athlete, we have the expertise and experience to help you achieve your goals.
// Our team of certified trainers and nutritionists are committed to providing personalized solutions that are tailored to your unique needs and goals. We take the time to get to know each of our clients so that we can create a plan that works for you. Whether you’re looking to lose weight, build muscle, or just improve your overall health, we have the knowledge and expertise to help you get there.
// Thank you for choosing our lifestyle company. We look forward to helping you achieve your health and fitness goals!
//             </p>
//         </div>
//      );

import { Link } from "react-router-dom";

// }
const AboutUs = () => {
    return (
      <div className="about-us">
        <h1 style={{marginTop : '50px' , marginBottom : '50px' , fontSize : '40px'}}>Welcome to Our Lifestyle Company</h1>
        <p>
          We are a team of dedicated professionals passionate about helping people
          achieve their health and fitness goals. Our services include personalized
          workout and nutrition plans tailored to your needs.
        </p>
        <p>
          At our core, we believe everyone deserves access to tools and resources
          for a healthy life. Our affordable services are designed for individuals
          worldwide, from beginners to athletes.
        </p>
        <p>
          Our certified trainers and nutritionists provide personalized solutions
          based on your unique goals. Whether it's weight loss, muscle building, or
          overall health improvement, we have the expertise to guide you.
        </p>
        <p>
          Thank you for choosing our lifestyle company. We're excited to join you on
          your health and fitness journey!
        </p>
        <Link to="/home" className="cta-button">Explore Our Services</Link>
      </div>
    );
  }
  
 
export default AboutUs;