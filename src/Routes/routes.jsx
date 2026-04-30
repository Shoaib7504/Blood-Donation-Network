import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import SearchDonor from "../pages/searchDonor/SearchDonor";
import Funding from "../pages/Funding/Funding";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import DashboardHome from "../Layout/DashboardLayout/DashboardHome";
import Profile from "../Layout/DashboardLayout/Profile";


const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/', index: true,
                Component: Home
            },
            {
                path: '/donation-request',
                element: <PrivateRoutes>
                    <DonationRequest></DonationRequest>
                </PrivateRoutes>
            },
            {
                path: '/search-donor',
                Component: SearchDonor
            },
            {
                path: '/funding',
                element: <PrivateRoutes>
                    <Funding></Funding>
                </PrivateRoutes>
            }
        ]
    },
    {

        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: LoginPage
            },
            {
                path: 'register',
                Component: RegisterPage
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        children: [{
            path: '/dashboard', index: true,
            Component: DashboardHome

        },
        {
            path: '/dashboard/profile',
            Component: Profile
        }]
    }
])
export default router