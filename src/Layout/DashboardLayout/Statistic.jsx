import {
  Droplets,
  HeartHandshake,
  Users,
  WalletCards,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpiner from "../../Components/LoadingSpiner";

const Statistic = () => {
  const axiosSecure = useAxiosSecure();

  // requests query
  const {
    data: requests = [],
    isLoading: requestsLoading,
    isError: requestsError,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axiosSecure.get("/request");
      return result.data;
    },
  });

  // users query
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  // loading state
  if (requestsLoading || usersLoading) {
    return <LoadingSpiner />;
  }

  // error state
  if (requestsError || usersError) {
    return (
      <p className="text-center text-red-500">
        Error loading data...
      </p>
    );
  }

  // dynamic statistics
  const totalUsers = users.length;

  const totalRequests = requests.length;

  const activeDonors = users.filter(
    (user) => user.role === "donor"
  ).length;

  const completedDonations = requests.filter(
    (request) => request.status === "completed"
  ).length;

  const adminStats = [
    {
      label: "Total Users",
      value: totalUsers,
      delta: "+5.2%",
      icon: Users,
    },
    {
      label: "Completed Donations",
      value: completedDonations,
      delta: "+12.4%",
      icon: WalletCards,
    },
    {
      label: "Total Requests",
      value: totalRequests,
      delta: "+2.1%",
      icon: Droplets,
    },
    {
      label: "Active Donors",
      value: activeDonors,
      delta: "+8.0%",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="px-10">
      {/* Hero Section */}
      <section className="bg-hero-medical border-b mx-auto rounded-xl mb-5 mt-5 border-border">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">
            Statistics Overview
          </h1>

          <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">
            Operational metrics across users, requests, and donations
            for the LifeDrop network.
          </p>
        </div>
      </section>

      {/* Statistics Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map(({ label, value, delta, icon: Icon }) => (
          <div
            key={label}
            className="rounded-3xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-blush text-primary">
                <Icon className="size-5" />
              </span>

              <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
                {delta}
              </span>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              {label}
            </p>

            <strong className="mt-1 block font-display text-4xl text-foreground">
              {value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistic;