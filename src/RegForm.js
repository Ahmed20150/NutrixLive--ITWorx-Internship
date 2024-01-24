import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Back from './Back';





const RegForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(''); // Radio button group for gender selection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(""); // State for error message
  const [showSuccess, setShowSuccess] = useState(false);




  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission and registration process
    //Temporary console log to see the values
    // console.log('First Name:', firstName);
    // console.log('Last Name:', lastName);
    // console.log('Date of Birth:', dateOfBirth);
    // console.log('Gender:', gender);
    // console.log('Email:', email);
    // console.log('Password:', password);
    const formData = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      gender: gender,
      email: email,
      password: password,
    };
  
  console.log(formData);

  axios.post('http://127.0.0.1:8000/users/createUser/', formData)
  .then(response => {
    console.log(response.data);
    if (response.data["message" ] === "User created successfully"){
      setError("");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/login'); // Redirect to the login page after 3 seconds
      }, 1000);
    }
    else {
      setError("user already exists!");

    }
    
    // alert(JSON.stringify(response.data));
    // handleClick(response.data);
    // toast.success(response.data);
  })
  .catch(error => {
    console.log(error);
  });



  };

  return (
    <div className="reg-main">
        {/* <div className="reg-quotes">
            <h3>Nourish your body, nourish your life.</h3>
            <h3>Join us and embrace a healthier you</h3>
        </div> */}
        <Back />
    <div className="registration-form">
        <h2>NutrixLive</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="gender-radio">
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Female
            </label>
           
          </div>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* {error && <div className="error-message" style={{color:'red',fontSize:'16px'}}>{error}</div>} */}
        {showSuccess && (
        <div className="success-message" style={{ color: 'green' }}>
          User registered successfully!
        </div>
      )}
      {error && (
        <div className="error-message" style={{ color: 'red', fontSize: '16px' }}>
          {error}
        </div>
      )}

        <button type="submit" className='form-button' >Register</button>


      </form>

    </div>
    </div>
  );
};


 
export default RegForm;