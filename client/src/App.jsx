import Header from "./components/Header/Header";
import SubHeader from "./components/SubHeader/SubHeader";
import Writing from "./pages/Writing/Writing";
import Practice from "./pages/Listening/Practice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SubHeader />
        <Routes>
          <Route path="writing" element={<Writing />} />
          <Route path="listening/practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
