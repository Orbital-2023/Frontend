import Landing from "./pages/Landing";
import Login from "./scenes/login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from "./services/userContext";

function App() {
 return (
   <div className="App">
     <UserContextProvider>
       <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="dashboard" element={<Dashboard />} />
         <Route path="login" element={<Login />} />
       </Routes>
     </UserContextProvider>
   </div>
 );
}
export default App
