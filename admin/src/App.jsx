import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ListeningVideos from "./pages/ListeningVideos/ListeningVideos";
import AddVideo from "./pages/ListeningVideos/AddVideo";
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
            </Routes>
          </main>
        </section>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
