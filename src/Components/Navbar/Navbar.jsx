import { useState } from "react";
import {
  ChevronDown,
  Droplets,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";


const navLinks = [
  { to: "/", label: "Home" },
  { to: "/donation-request", label: "Donation Requests" },
  { to: "/search-donor", label: "Search Donor" },
  { to: "/funding", label: "Funding" },
];



const Navbar = () => {
  const { user, Logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClassName = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
    ].join(" ");

  const mobileLinkClassName = ({ isActive }) =>
    [
      "flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-foreground hover:bg-secondary",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-x-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="pulse-drop flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
            <Droplets className="size-6" fill="currentColor" />
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

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} className={linkClassName} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">



          {
            user ? ('') : (<Link
              to="/login"
              className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-card transition hover:border-primary/30 hover:bg-secondary sm:inline-flex"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>)
          }

          <div className="group relative hidden sm:block">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pr-3 shadow-card transition hover:border-primary/30"
              aria-label="Account menu"
            >
              {user ? (<div className="w-9 border-2  border-gray-300 rounded-full">
                <img
                  className="rounded-2xl"
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>) : (<span className="flex size-9 items-center justify-center rounded-full bg-blush text-sm font-bold text-primary">
                AR
              </span>)}

              <ChevronDown className="size-4 text-muted-foreground" />
            </button>

            <div className="invisible absolute right-0 mt-3 w-44 translate-y-2 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-soft transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </NavLink>
              <button
                onClick={Logout}
                type="button"
                className="flex cursor-pointer w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition hover:border-primary/30 lg:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border/70 bg-background/95 px-4 py-4 backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                className={mobileLinkClassName}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-2 rounded-2xl border border-border bg-card p-2">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Account
              </p>

              <NavLink
                to="/login"
                className={mobileLinkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>


              <NavLink

                to='/dashboard'
                className={mobileLinkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="mr-2 size-4" />

              </NavLink>


              <button
                onClick={Logout}
                type="button"
                className="flex cursor-pointer w-full items-center rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <LogOut className="mr-2 size-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
