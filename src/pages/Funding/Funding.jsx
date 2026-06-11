import {
  CheckCircle2,
  HeartHandshake,
  Search,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import LoadingSpiner from "../../Components/LoadingSpiner";

const Funding = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // stripe payment — requires login so uses axiosSecure
  const handelPayment = async () => {
    try {
      const paymentInfo = {
        name: user?.displayName,
        email: user?.email,
        amount: 100,
      };

      const res = await axiosSecure.post(
        `/create-checkout-session`,
        paymentInfo
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  //  donation is public — use plain axios, no token needed
  const {
    data: fundingRecords = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["funding-records"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation`
      );
      return res.data;
    },
  });

  // total donation amount
  const totalFund = fundingRecords.reduce((total, item) => {
    return total + Number(item.donationAmount || 0);
  }, 0);

  const items = [
    "Emergency transport",
    "Medical screening",
    "Community drives",
  ];

  if (isLoading) return <LoadingSpiner />;

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Something went wrong...
      </p>
    );
  }

  return (
    <div>
      {/* hero section */}
      <section className="bg-hero-medical px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">

          {/* left side */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-card">
              <ShieldCheck className="size-4" />
              Secure funding • Stripe powered
            </p>

            <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">
              Every contribution is a heartbeat for someone in need.
            </h1>

            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Transparent funding with public records. Your gift helps emergency
              transport, donor screening and community drives.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handelPayment}
                className="flex cursor-pointer items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white hover:opacity-90"
              >
                <HeartHandshake />
                Give Fund
              </button>

              <span className="text-sm text-muted-foreground">
                Secure Stripe checkout
              </span>
            </div>
          </div>

          {/* right card */}
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Total funds raised
            </p>

            <div className="mt-4 flex items-center gap-3">
              <h2 className="text-5xl font-black text-primary">
                $ {totalFund}
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                <TrendingUp className="size-3" />
                Live
              </span>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {fundingRecords.length} people already contributed.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-blush p-4">
                <p className="text-xs text-muted-foreground">
                  Contributors
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  {fundingRecords.length}
                </h3>
              </div>

              <div className="rounded-2xl bg-blush p-4">
                <p className="text-xs text-muted-foreground">
                  Drives funded
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  12
                </h3>
              </div>

              <div className="rounded-2xl bg-blush p-4">
                <p className="text-xs text-muted-foreground">
                  Lives impacted
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  340+
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* donation table */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 mt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-5xl font-black">
              Recent contributions
            </h2>

            <p className="mt-2 text-muted-foreground">
              Every donation is visible publicly.
            </p>
          </div>

          {/* search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search contributor"
              className="w-full rounded-2xl border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none"
            />
          </div>
        </div>

        {/* table */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Contributor</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Method</th>
                </tr>
              </thead>

              <tbody>
                {fundingRecords.map((donation, index) => (
                  <tr
                    key={index}
                    className="border-t border-border hover:bg-blush/40"
                  >
                    {/* name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-blush text-sm font-bold text-primary">
                          {donation.name
                            ?.split(" ")
                            .map((item) => item[0])
                            .join("")
                            .slice(0, 2)}
                        </span>

                        <span className="font-semibold">
                          {donation.name}
                        </span>
                      </div>
                    </td>

                    {/* amount */}
                    <td className="px-6 py-4 font-bold text-primary">
                      $ {donation.donationAmount}
                    </td>

                    {/* date */}
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(donation.payment_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* payment method */}
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                        <CheckCircle2 className="size-3" />

                        {donation.method
                          ? donation.method.toUpperCase()
                          : "CARD"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* footer */}
              <tfoot>
                <tr className="border-t border-border bg-blush/40">
                  <td className="px-6 py-4 font-bold">
                    Total
                  </td>

                  <td
                    colSpan={3}
                    className="px-6 py-4 text-lg font-black text-primary"
                  >
                    $ {totalFund}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* cards */}
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {items.map((item, index) => (
          <article
            key={index}
            className="rounded-3xl border bg-white p-7 shadow-sm"
          >
            <WalletCards className="h-10 w-10 text-red-500" />

            <h3 className="mt-5 text-xl font-bold">
              {item}
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Transparent donation campaigns and impact tracking.
            </p>

            <div className="mt-6 h-4 rounded-full bg-gray-200">
              <div
                className="h-4 rounded-full bg-red-500"
                style={{
                  width: `${55 + index * 12}%`,
                }}
              />
            </div>

            <button className="mt-6 w-full rounded-2xl bg-blush py-2 text-primary hover:bg-accent">
              Contribute
            </button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Funding;