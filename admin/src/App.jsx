import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ListeningVideos from "./pages/ListeningVideos/ListeningVideos";
import AddVideo from "./pages/ListeningVideos/AddVideo";
import EditVideo from "./pages/ListeningVideos/EditVideo";
import DeleteVideo from "./pages/ListeningVideos/DeleteVideo";
import WritingTopics from "./pages/WritingTopics/WritingTopics";
import AddWritingTopic from "./pages/WritingTopics/AddWritingTopic";
import EditWritingTopic from "./pages/WritingTopics/EditWritingTopic";
import DeleteWritingTopic from "./pages/WritingTopics/DeleteWritingTopic";
import SpeakingTopics from "./pages/SpeakingTopics/SpeakingTopics";
import AddSpeakingTopic from "./pages/SpeakingTopics/AddSpeakingTopic";
import EditSpeakingTopic from "./pages/SpeakingTopics/EditSpeakingTopic";
import DeleteSpeakingTopic from "./pages/SpeakingTopics/DeleteSpeakingTopic";
import ReadingArticles from "./pages/ReadingArticles/ReadingArticles";
import AddReadingArticle from "./pages/ReadingArticles/AddReadingArticle";
import EditReadingArticle from "./pages/ReadingArticles/EditReadingArticle";
import DeleteReadingArticle from "./pages/ReadingArticles/DeleteReadingArticle";
import ShortStories from "./pages/ShortStories/ShortStories";
import AddShortStory from "./pages/ShortStories/AddShortStory";
import EditShortStory from "./pages/ShortStories/EditShortStory";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <section className="content">
          <Sidebar />
          <main>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="listeningvideos" element={<ListeningVideos />} />
              <Route path="listeningvideos/add" element={<AddVideo />} />
              <Route path="listeningvideos/edit" element={<EditVideo />} />
              <Route path="listeningvideos/delete" element={<DeleteVideo />} />
              <Route path="writingtopics" element={<WritingTopics />} />
              <Route path="writingtopics/add" element={<AddWritingTopic />} />
              <Route path="writingtopics/edit" element={<EditWritingTopic />} />
              <Route
                path="writingtopics/delete"
                element={<DeleteWritingTopic />}
              />
              <Route path="speakingtopics" element={<SpeakingTopics />} />
              <Route path="speakingtopics/add" element={<AddSpeakingTopic />} />
              <Route
                path="/speakingtopics/edit"
                element={<EditSpeakingTopic />}
              />
              <Route
                path="/speakingtopics/delete"
                element={<DeleteSpeakingTopic />}
              />
              <Route path="/readingarticles" element={<ReadingArticles />} />
              <Route
                path="/readingarticles/add"
                element={<AddReadingArticle />}
              />
              <Route
                path="/readingarticles/edit"
                element={<EditReadingArticle />}
              />
              <Route
                path="/readingarticles/delete"
                element={<DeleteReadingArticle />}
              />
              <Route path="/shortstories" element={<ShortStories />} />
              <Route path="/shortstories/add" element={<AddShortStory />} />
              <Route path="/shortstories/edit" element={<EditShortStory />} />
            </Routes>
          </main>
        </section>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
