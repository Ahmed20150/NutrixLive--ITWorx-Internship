import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import MainPage from './MainPage';
import PrivateRoute from './PrivateRoute';
import RegForm from './RegForm';
import DietPlan from './DietPlan';
import WorkoutPlan from './WorkoutPlan';
import MedicalDiagnosis from './MedicalDiagnosis';
import NewDietPlan from './NewDietPlan';
import NewWorkout from './NewWorkout';
import Back from './Back';
import Loading from './Loading';
import ContactForm from './Contact';
import { isLoggedIn } from './LoginForm';
import AboutUs from './AboutUs';




function App() {
  const LoggedIn= window.localStorage.getItem("isLoggedIn2");


  return (
      <div className='App'>
        <Router>
          <div className='content'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<RegForm />} />
              <Route path='/' element={<Back />} />
              <Route path='/loading' element={<Loading />} />
              <Route path='/contact' element={<ContactForm />} />
              {/* Use the <Route> component with a custom element */}
              <Route path='/home' element={<MainPage />}  />
              <Route path='/dietPlan' element={<DietPlan />}  />
              <Route path='/workoutPlan' element={<WorkoutPlan />}  />
              <Route path='/medicalDiagnosis' element={<MedicalDiagnosis />}  />
              <Route path='/NewDietPlan' element={<NewDietPlan />} />
              <Route path='/NewWorkout' element={<NewWorkout />} />
              <Route path='/AboutUs' element={<AboutUs />} />

            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
