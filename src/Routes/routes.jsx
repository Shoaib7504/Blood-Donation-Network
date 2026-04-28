import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import SearchDonor from "../pages/searchDonor/SearchDonor";
import Funding from "../pages/Funding/Funding";


const router=createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                path:'/', index:true,
                Component:Home
            },
            {
                path:'/donation-request',
                Component: DonationRequest
            },
            {
                path:'/search-donor',
                Component: SearchDonor
            },
            {
                path:'/funding',
                Component: Funding
            }
        ]
    }
])
export default router