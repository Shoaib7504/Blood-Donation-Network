import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";



const MainLayout = () => {

    return (
        <div className="w-11/12 mx-auto">
          <Navbar></Navbar>
           <Outlet></Outlet> 
           <Footer></Footer>         
        </div>
    );
};

export default MainLayout;