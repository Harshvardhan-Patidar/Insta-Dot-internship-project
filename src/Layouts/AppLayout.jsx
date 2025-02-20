import { Outlet } from "react-router-dom";
import Header from "../UI/Header";
import Footer from "../UI/footer";

export const AppLayout = ({isAuthenticated}) => {
  return (
    <>
      <Header isAuth={isAuthenticated}/>
      <Outlet />
      <Footer />
    </>
  );
};