import Header from "./components/Header/Header";
import SubHeader from "./components/SubHeader/SubHeader";
import Writing from "./pages/Writing/Writing";
import Practice from "./pages/Listening/Practice";
import Transcript from "./pages/Listening/Transcript";
import Score from "./pages/Listening/Score";
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
          <Route
            path="listening/practice/transcript"
            element={<Transcript />}
          />
          <Route path="listening/practice/score" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
