import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

// Format this to another page so that app.tsx can encompass all other pages within the application

function App() {
 return(
  // <Landing></Landing>
  <Dashboard></Dashboard>
 )
}
export default App
