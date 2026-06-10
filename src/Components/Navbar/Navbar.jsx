import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Droplets,
  HandHeart,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";


const simpleLinks = [
  { to: "/", label: "Home" },
  { to: "/search-donor", label: "Search Donor" },
];


const megaMenuItems = [
  {
    to: "/donation-request",
    icon: HandHeart,
    label: "Donation Requests",
    desc: "Browse & respond to urgent blood requests",
  },
  {
    to: "/search-donor",
    icon: Search,
    label: "Find Donors",
    desc: "Search verified donors near your area",
  },
  {
    to: "/funding",
    icon: Wallet,
    label: "Funding",
    desc: "Support campaigns & track contributions",
  },
];


const profileLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/profile", icon: User, label: "My Profile" },
  { to: "/dashboard/my-requests", icon: Heart, label: "My Requests" },
  { to: "/dashboard/create-request", icon: HandHeart, label: "Create Request" },
];

const Navbar = () => {
  const { user, Logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const megaRef = useRef(null);
  const profileRef = useRef(null);

  /* close dropdowns on route change */
  useEffect(() => {
    setMegaOpen(false);
    setProfileOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  /* close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* close on Escape */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const linkClass = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    [
      "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary",
    ].join(" ");

  const initials =
    user?.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-x-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

        {/* ═══ Desktop Nav ═══ */}
        <nav className="hidden items-center gap-1 lg:flex">
          {simpleLinks.map((link) => (
            <NavLink key={link.to} className={linkClass} to={link.to}>
              {link.label}
            </NavLink>
          ))}

          {/* ── Services Mega Menu Trigger ── */}
          <div ref={megaRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setMegaOpen((v) => !v);
                setProfileOpen(false);
              }}
              className={[
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                megaOpen
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              ].join(" ")}
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                className={`size-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={[
                "absolute left-1/2 -translate-x-1/2 mt-3 w-[420px] origin-top rounded-2xl border border-border/80 bg-card/95 p-2 shadow-soft backdrop-blur-xl",
                "transition-all duration-200 ease-out",
                megaOpen
                  ? "visible scale-100 translate-y-0 opacity-100"
                  : "invisible scale-95 -translate-y-2 opacity-0 pointer-events-none",
              ].join(" ")}
            >
              {/* header */}
              <div className="px-3 pt-2 pb-3">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Our Services
                </p>
              </div>

              {/* items */}
              <div className="grid gap-1">
                {megaMenuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-primary/5"
                  >
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-blush text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>

              {/* footer */}
              <div className="mt-2 border-t border-border/60 pt-2">
                <NavLink
                  to="/funding"
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  <span className="flex items-center gap-2">
                    <Users className="size-4" />
                    View all services
                  </span>
                  <span className="text-lg leading-none">→</span>
                </NavLink>
              </div>
            </div>
          </div>

          <NavLink className={linkClass} to="/funding">
            Funding
          </NavLink>
        </nav>

        {/* ═══ Right side actions ═══ */}
        <div className="flex items-center gap-2">

          {/* ── Login (when no user) ── */}
          {!user && (
            <Link
              to="/login"
              className="hidden rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-foreground shadow-card transition hover:border-primary/30 hover:bg-secondary sm:inline-flex"
            >
              Login
            </Link>
          )}

          {/* ── Profile Mega Dropdown ── */}
          <div ref={profileRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((v) => !v);
                setMegaOpen(false);
              }}
              className={[
                "flex items-center gap-2 rounded-full border bg-card p-1.5 pr-3 shadow-card transition",
                profileOpen
                  ? "border-primary/40 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/30",
              ].join(" ")}
              aria-label="Account menu"
              aria-expanded={profileOpen}
              aria-haspopup="true"
            >
              {user ? (
                <div className="size-9 overflow-hidden rounded-full border-2 border-primary/20">
                  <img
                    className="size-full object-cover"
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              ) : (
                <span className="flex size-9 items-center justify-center rounded-full bg-blush text-sm font-bold text-primary">
                  {initials}
                </span>
              )}
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* ── Profile Dropdown Panel ── */}
            <div
              className={[
                "absolute right-0 mt-3 w-72 origin-top-right rounded-2xl border border-border/80 bg-card/95 p-2 shadow-soft backdrop-blur-xl",
                "transition-all duration-200 ease-out",
                profileOpen
                  ? "visible scale-100 translate-y-0 opacity-100"
                  : "invisible scale-95 -translate-y-2 opacity-0 pointer-events-none",
              ].join(" ")}
            >
              {/* ─ User info header ─ */}
              {user && (
                <div className="rounded-xl bg-gradient-to-br from-primary/5 to-blush px-4 py-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="size-12 overflow-hidden rounded-full border-2 border-primary/20 shadow-md">
                      <img
                        className="size-full object-cover"
                        alt="avatar"
                        referrerPolicy="no-referrer"
                        src={
                          user.photoURL ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold text-foreground">
                        {user.displayName || "User"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                      <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                      Active Donor
                    </span>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      Verified
                    </span>
                  </div>
                </div>
              )}

              {/* ─ Quick links ─ */}
              <div className="py-1">
                <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                  Quick Access
                </p>
                {profileLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/5"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-white">
                      <link.icon className="size-4" />
                    </span>
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* ─ Divider + settings / logout ─ */}
              <div className="border-t border-border/60 pt-1 mt-1">
                <NavLink
                  to="/dashboard/profile"
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/5"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-white">
                    <Settings className="size-4" />
                  </span>
                  Settings
                </NavLink>

                <button
                  onClick={Logout}
                  type="button"
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-400 transition-colors group-hover:bg-red-500 group-hover:text-white">
                    <LogOut className="size-4" />
                  </span>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition hover:border-primary/30 lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ═══ Mobile Menu ═══ */}
      <div
        id="mobile-menu"
        className={[
          "overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-xl lg:hidden",
          "transition-all duration-300 ease-out",
          mobileOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 border-t-0",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4">
          {/* nav links */}
          {simpleLinks.map((link) => (
            <NavLink key={link.to} className={mobileLinkClass} to={link.to}>
              {link.label}
            </NavLink>
          ))}

          {/* services section */}
          <p className="mt-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
            Services
          </p>
          {megaMenuItems.map((item) => (
            <NavLink key={item.to} className={mobileLinkClass} to={item.to}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-primary">
                <item.icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </NavLink>
          ))}

          {/* account section */}
          <div className="mt-3 rounded-2xl border border-border bg-card p-2">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
              Account
            </p>

            {user && (
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/5 to-blush px-3 py-3">
                <div className="size-10 overflow-hidden rounded-full border-2 border-primary/20">
                  <img
                    className="size-full object-cover"
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{user.displayName || "User"}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}

            {!user && (
              <NavLink className={mobileLinkClass} to="/login">
                Login
              </NavLink>
            )}

            {profileLinks.map((link) => (
              <NavLink key={link.to} className={mobileLinkClass} to={link.to}>
                <link.icon className="mr-1 size-4" />
                {link.label}
              </NavLink>
            ))}

            <button
              onClick={Logout}
              type="button"
              className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
