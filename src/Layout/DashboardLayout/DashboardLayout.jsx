import {
  ActivityIcon,
  Droplets,
  HeartHandshake,
  HeartPulse,
  House,
  LogOut,
  User,
  UserRoundKey,
  UserRoundPen,
} from "lucide-react";

import { Link, NavLink, Outlet } from "react-router";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import LoadingSpiner from "../../Components/LoadingSpiner";

const DashboardLayout = () => {
  const axiosSecure = useAxiosSecure();

  const { Logout } = useAuth();

  const { role, isReloading } = useRole();
  console.log(role);

  if (isReloading) {
    return <LoadingSpiner />;
  }

  // send volunteer request
  const handleRequest = async () => {
    try {
      await axiosSecure.post("/become-volunteer");

      toast.success(
        "Request sent, please wait for admin approval"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // sweet alert
  const volunteer = () => {
    const swalWithCustomButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mx-2",

        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mx-2",
      },

      buttonsStyling: false,
    });

    swalWithCustomButtons
      .fire({
        title: "Become a Volunteer 🤝",
        text: "Do you want to join as a volunteer?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Join",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })

      .then(async (result) => {
        if (result.isConfirmed) {
          await handleRequest();

          swalWithCustomButtons.fire({
            title: "Request Sent 🎉",
            text: "Please wait for admin approval.",
            icon: "success",
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithCustomButtons.fire({
            title: "Cancelled",
            text: "You are not a volunteer yet.",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-8">
      {/* Sidebar */}
      <div className="lg:col-span-2">
        <aside
          className="border-b border-border bg-card px-6 py-4 shadow-card
          lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r"
        >
          <Link
            to="/"
            className="flex items-center gap-x-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="pulse-drop flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
              <Droplets
                className="size-6"
                fill="currentColor"
              />
            </span>

            <div className="leading-tight">
              <span className="block font-display text-xl font-bold text-foreground">
                LifeDrop
              </span>

              <span className="block text-xs font-medium text-muted-foreground">
                Blood Donation Network
              </span>
            </div>
          </Link>

          <nav className="mt-8 grid gap-2">
            {/* DONOR */}
            {role === "donor" && (
              <>
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <User /> Profile
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <House /> Dashboard Home
                </NavLink>

                <NavLink
                  to="/dashboard/my-requests"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <Droplets /> My Requests
                </NavLink>

                <NavLink
                  to="/dashboard/create-request"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <HeartPulse /> Create Request
                </NavLink>

                <button
                  onClick={volunteer}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <HeartHandshake />
                  Become A Volunteer
                </button>
              </>
            )}

            {/* ADMIN */}
            {role === "admin" && (
              <>
                <NavLink
                  to="/dashboard/statistic"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <ActivityIcon /> Statistic
                </NavLink>

                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <User /> Profile
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <House /> Dashboard Home
                </NavLink>

                <NavLink
                  to="/dashboard/manageUser"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <UserRoundPen /> Manage User
                </NavLink>

                <NavLink
                  to="/dashboard/volunteerRequest"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <UserRoundKey /> Volunteer Request
                </NavLink>
              </>
            )}

            {/* VOLUNTEER */}
            {role === "volunteer" && (
              <>
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <User /> Profile
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <House /> Dashboard Home
                </NavLink>

                <NavLink
                  to="/dashboard/my-requests"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <Droplets /> My Requests
                </NavLink>

                <NavLink
                  to="/dashboard/create-request"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <HeartPulse /> Create Request
                </NavLink>
              </>
            )}

            {/* Logout */}
            <button
              onClick={Logout}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary"
            >
              <LogOut className="size-5" />
              Logout
            </button>
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-6 border-2 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;