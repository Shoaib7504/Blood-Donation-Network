import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";


const MainLayout = () => {

    return (
        <div className="w-11/12 mx-auto">
           <Navbar></Navbar>
           <Outlet></Outlet>          
        </div>
    );
};

export default MainLayout;