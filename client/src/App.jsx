import Header from "./components/Header/Header";
import SubHeader from "./components/SubHeader/SubHeader";
import Writing from "./pages/Writing/Writing";
import Listening from "./pages/Listening/Listening";
import Reading from "./pages/Reading/Reading";
import Practice from "./pages/Listening/Practice";
import Transcript from "./pages/Listening/Transcript";
import Score from "./pages/Listening/Score";
import Stories from "./pages/Reading/Stories";
import Story from "./pages/Reading/Story";
import Articles from "./pages/Reading/Articles";
import Article from "./pages/Reading/Article";
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
          <Route path="listening" element={<Listening />} />
          <Route path="listening/practice" element={<Practice />} />
          <Route
            path="listening/practice/transcript"
            element={<Transcript />}
          />
          <Route path="listening/practice/score" element={<Score />} />
          <Route path="reading" element={<Reading />} />
          <Route path="reading/stories" element={<Stories />} />
          <Route path="reading/stories/story" element={<Story />} />
          <Route path="/reading/articles" element={<Articles />} />
          <Route path="/reading/articles/article" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
