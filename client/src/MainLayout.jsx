import Header from "./components/Header/Header";
import SubHeader from "./components/SubHeader/SubHeader";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <SubHeader />
      <Outlet />
      <Footer />
    </>
  );
}
