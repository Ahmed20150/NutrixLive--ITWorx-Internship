// ContactForm.js

import Back from "./Back";
import React, { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to track pop-up visibility
  const navigate= useNavigate();
  function checkLogin(){
    console.log("start")

    const userData = {
        email: localStorage.getItem("email"),
        session_token: localStorage.getItem("token"),
    };

axios.post('http://127.0.0.1:8000/users/validateSession/', userData)
.then(response => {
    console.log(response.data["isValid"]);

if(response.data["isValid"] !== "True"){
        navigate("/");
}
else{
    navigate('/contact');
}
})
.catch(error => {
  console.log(error.data);
});

}
useEffect(() => {
    checkLogin();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted!");


    const formData = {
      name: name,
      email: email,
      message: message,
    };

    console.log(formData);

    axios.post('http://127.0.0.1:8000/message/sendMessage/', formData)
    .then(response => {
      console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });




    // Show the pop-up when the form is submitted successfully
    setShowPopup(true);

    // Reset the form fields after successful submission
    setName("");
    setEmail("");
    setMessage("");

    // Hide the pop-up after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="contact-form-container">
      <Back />
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
          />
        </div>

        <button type="submit" className="form-button">
          Submit
        </button>

        <div className="text">
          <p>
            We value your feedback a lot! If you have any questions or concerns, please provide them above and we will contact you as soon as possible.{" "}
          </p>
        </div>
      </form>

      {/* Pop-up message */}
      {showPopup && (
        <div className="popup">
          <p>Message submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
