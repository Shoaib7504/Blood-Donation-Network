import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";

const router=createBrowserRouter([
    {
        path:'/',
        Component:MainLayout
    }
])
export default router