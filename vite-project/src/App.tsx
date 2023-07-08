import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from 'react-router-dom';

function App() {
 return(
  <div className="App">
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  </div>
 )
}
export default App

/*
todo for login / registration
1. change the login section at the bottom of the landing page to be 2 separate pages - login & registration
1.1. during registration, ask for the timeframe
2. integrate login / registration apis
3. react frontend will handle the validation process before sending it to the backend i.e. email

todo for calendar
1. timeframe of the 1 week to be displayed at the top of the calendar
2. change the type to view the personnel who are busy on the individual cells

*/
