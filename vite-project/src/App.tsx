import Landing from "./pages/Landing";
import OnLogin from "./scenes/login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from 'react-router-dom';

function App() {
 return(
  <div className="App">
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="onlogin" element={<OnLogin />} />
    </Routes>
  </div>
 )
}
export default App
