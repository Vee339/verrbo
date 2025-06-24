import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout/Logout";
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
import DeleteShortStory from "./pages/ShortStories/DeleteShortStory";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter basename="/verrbo/admin">
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="listeningvideos"
              element={
                <ProtectedRoute>
                  <ListeningVideos />
                </ProtectedRoute>
              }
            />
            <Route
              path="listeningvideos/add"
              element={
                <ProtectedRoute>
                  <AddVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="listeningvideos/edit"
              element={
                <ProtectedRoute>
                  <EditVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="listeningvideos/delete"
              element={
                <ProtectedRoute>
                  <DeleteVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="writingtopics"
              element={
                <ProtectedRoute>
                  <WritingTopics />
                </ProtectedRoute>
              }
            />
            <Route
              path="writingtopics/add"
              element={
                <ProtectedRoute>
                  <AddWritingTopic />
                </ProtectedRoute>
              }
            />
            <Route
              path="writingtopics/edit"
              element={
                <ProtectedRoute>
                  <EditWritingTopic />
                </ProtectedRoute>
              }
            />
            <Route
              path="writingtopics/delete"
              element={
                <ProtectedRoute>
                  <DeleteWritingTopic />
                </ProtectedRoute>
              }
            />
            <Route
              path="speakingtopics"
              element={
                <ProtectedRoute>
                  <SpeakingTopics />
                </ProtectedRoute>
              }
            />
            <Route
              path="speakingtopics/add"
              element={
                <ProtectedRoute>
                  <AddSpeakingTopic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/speakingtopics/edit"
              element={
                <ProtectedRoute>
                  <EditSpeakingTopic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/speakingtopics/delete"
              element={
                <ProtectedRoute>
                  <DeleteSpeakingTopic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/readingarticles"
              element={
                <ProtectedRoute>
                  <ReadingArticles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/readingarticles/add"
              element={
                <ProtectedRoute>
                  <AddReadingArticle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/readingarticles/edit"
              element={
                <ProtectedRoute>
                  <EditReadingArticle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/readingarticles/delete"
              element={
                <ProtectedRoute>
                  <DeleteReadingArticle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shortstories"
              element={
                <ProtectedRoute>
                  <ShortStories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shortstories/add"
              element={
                <ProtectedRoute>
                  <AddShortStory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shortstories/edit"
              element={
                <ProtectedRoute>
                  <EditShortStory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shortstories/delete"
              element={
                <ProtectedRoute>
                  <DeleteShortStory />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route
            path="/admin/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
