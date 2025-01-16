import { BrowserRouter, Route, Routes } from "react-router-dom";
import People from "./Pages/People";
import Cars from "./Pages/Cars";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
