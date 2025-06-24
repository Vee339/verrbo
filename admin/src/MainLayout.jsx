import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <section className="content">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </section>
      <Footer />
    </>
  );
}
