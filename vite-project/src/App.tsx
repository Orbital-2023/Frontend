import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from 'react-router-dom';
import MyComponent from "./pages/Test"

function App() {
 return(
  <div className="App">
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
    {/* <MyComponent></MyComponent> */}
  </div>
 )
}
export default App
