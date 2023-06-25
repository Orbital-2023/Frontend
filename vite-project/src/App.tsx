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
