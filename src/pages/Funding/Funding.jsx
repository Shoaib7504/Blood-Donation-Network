import { HeartHandshake, ShieldCheck, TrendingUp, WalletCards } from "lucide-react";
import { useState } from "react";

const Funding = () => {
  const [open, setOpen] = useState(false);

  const items = ["Emergency transport", "Medical screening", "Community drives"];

  const stats = [
    ["Contributors", "12"],
    ["Drives funded", "12"],
    ["Lives impacted", "340+"],
  ];

  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-hero-medical px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-card">
              <ShieldCheck className="size-4" />
              Secure funding • Stripe powered
            </p>

            <h1 className="mt-5 font-display text-5xl font-black leading-tight sm:text-6xl">
              Every contribution is a heartbeat for someone in need.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Transparent funding with public records. Your gift powers emergency transport,
              donor screening, and community drives across the country.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-white hover:opacity-90"
              >
                <HeartHandshake />
                Give Fund
              </button>

              <span className="text-sm text-muted-foreground">
                Encrypted checkout • 256-bit TLS • PCI-DSS compliant
              </span>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Total funds raised
            </p>

            <div className="mt-3 flex items-end gap-3">
              <strong className="font-display text-5xl font-black text-primary sm:text-6xl">
                120000
              </strong>

              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-bold text-success">
                <TrendingUp className="size-3" />
                Live
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              From 28348 contributors and growing every day.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-blush p-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    {label}
                  </p>
                  <strong className="mt-1 block font-display text-2xl text-foreground">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">

        {items.map((item, index) => (
          <article
            key={item}
            className="rounded-3xl border bg-white p-7 shadow-sm transition hover:shadow-md"
          >
            <WalletCards className="h-10 w-10 text-red-500" />

            <h3 className="mt-5 text-xl font-bold">
              {item}
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Transparent UI cards for donation funding campaigns and impact goals.
            </p>

            <div className="mt-6 h-5 rounded-full bg-gray-200">
              <div
                className="h-5 rounded-full bg-red-500"
                style={{ width: `${55 + index * 12}%` }}
              />
            </div>

            <button className="mt-6 w-full rounded-2xl bg-blush py-2 text-primary hover:bg-accent hover:-translate-y-0.5">
              Contribute
            </button>
          </article>
        ))}

      </section>

    </div>
  );
};

export default Funding;