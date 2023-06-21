import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";

// Format this to another page so that app.tsx can encompass all other pages within the application

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );

  return <div className="app bg-gray-20">

    <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
  </div>;
}

export default App
