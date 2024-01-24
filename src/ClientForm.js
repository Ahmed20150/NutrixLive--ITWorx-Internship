import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const [name , setName] = useState("");
  const [age , setAge] = useState("");
  const [gender , setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission and further processing
    console.log('Name: ' + name);
    console.log('Age: ' + age);
    console.log('Gender: ' + gender);
  };

  return (
    <div className="client-info">
        <form onSubmit={handleSubmit}>
            <div className="client-name">
            <label htmlFor="name">Name: </label>
            <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="client-age">
            <label htmlFor="age">Age: </label>
            <input type="number" id='age' value={age} onChange={(e) => setAge(e.target.value)} required/>
            </div>
            <div className="client-gender">
            <label htmlFor="gender">Gender: </label>
            <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="" disabled >Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            </div>
            <button type="submit">Next</button>

        </form>
    </div>
  );
};

export default ClientForm;
