// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import {
  Camera,
  CheckCircle,
  Droplets,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
} from 'lucide-react';
import LoadingSpiner from '../../Components/LoadingSpiner';

const Profile = () => {
  const { user } = useAuth();
  const { role, isReloading } = useRole();

  if (isReloading) return <LoadingSpiner />;

  const initials =
    user?.displayName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  const roleBadge = {
    admin: { label: 'Admin', bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
    volunteer: { label: 'Volunteer', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    donor: { label: 'Donor', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  }[role] || { label: 'Donor', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' };

  return (
    <div className="px-3 sm:px-5 lg:px-8 py-4 sm:py-6">

      {/* Hero */}
      <section className="bg-hero-medical border-b rounded-xl mb-6 border-border">
        <div className="px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
          <p className="text-sm font-semibold text-primary/80 uppercase tracking-wider">
            Account Settings
          </p>
          <h1 className="mt-2 font-display text-2xl sm:text-4xl lg:text-5xl font-black text-foreground">
            My Profile
          </h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            A calm editable profile card layout for donor identity and contact details.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-6">

        {/* ═══ Profile Card ═══ */}
        <div className="rounded-2xl sm:rounded-3xl border border-border bg-card shadow-sm overflow-hidden">

          {/* Cover gradient */}
          <div className="h-28 sm:h-36 bg-gradient-to-br from-primary/20 via-blush to-accent/30 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,var(--primary)_0%,transparent_50%)] opacity-10" />
          </div>

          {/* Avatar + info */}
          <div className="px-5 sm:px-8 pb-6 sm:pb-8 -mt-12 sm:-mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">

              {/* Avatar */}
              <div className="relative group shrink-0">
                <div className="size-24 sm:size-28 rounded-2xl sm:rounded-3xl border-4 border-card bg-card shadow-lg overflow-hidden">
                  {user?.photoURL ? (
                    <img
                      className="size-full object-cover"
                      alt="Profile"
                      referrerPolicy="no-referrer"
                      src={user.photoURL}
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center bg-blush text-primary font-display text-3xl font-bold">
                      {initials}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-xl bg-primary text-white shadow-md
                             opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Change photo"
                >
                  <Camera className="size-4" />
                </button>
              </div>

              {/* Name + badges */}
              <div className="mt-4 sm:mt-0 sm:pb-1 flex-1 min-w-0 rounded-2xl bg-card/90 backdrop-blur-sm p-3 sm:p-4 shadow-sm border border-border/40">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground truncate">
                    {user?.displayName || 'User'}
                  </h2>
                  <CheckCircle className="size-5 text-blue-500 shrink-0" />
                </div>

                <p className="mt-0.5 text-sm text-muted-foreground truncate">
                  {user?.email}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${roleBadge.bg} ${roleBadge.text}`}>
                    <span className={`size-1.5 rounded-full ${roleBadge.dot} animate-pulse`} />
                    {roleBadge.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Shield className="size-3" />
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Edit Form ═══ */}
        <form className="rounded-2xl sm:rounded-3xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 sm:px-8 py-4 sm:py-5">
            <h3 className="font-display text-base sm:text-lg font-bold flex items-center gap-2">
              <User className="size-5 text-primary" />
              Personal Information
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Update your personal details and contact information.
            </p>
          </div>

          <div className="px-5 sm:px-8 py-5 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <User className="size-3.5 text-muted-foreground" />
                  Full Name
                </label>
                <input
                  id="name"
                  defaultValue={user?.displayName || ''}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm
                             outline-none transition-all
                             focus:ring-2 focus:ring-primary/30 focus:border-primary
                             placeholder:text-muted-foreground/50"
                  placeholder="Full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Mail className="size-3.5 text-muted-foreground" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ''}
                  readOnly
                  className="w-full rounded-xl border border-input bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground
                             outline-none cursor-not-allowed"
                  placeholder="Email"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Phone className="size-3.5 text-muted-foreground" />
                  Phone
                </label>
                <input
                  id="phone"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm
                             outline-none transition-all
                             focus:ring-2 focus:ring-primary/30 focus:border-primary
                             placeholder:text-muted-foreground/50"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-1.5">
                <label htmlFor="blood" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Droplets className="size-3.5 text-muted-foreground" />
                  Blood Group
                </label>
                <select
                  id="blood"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm
                             outline-none transition-all cursor-pointer
                             focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="">Select blood group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label htmlFor="district" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <MapPin className="size-3.5 text-muted-foreground" />
                  District
                </label>
                <input
                  id="district"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm
                             outline-none transition-all
                             focus:ring-2 focus:ring-primary/30 focus:border-primary
                             placeholder:text-muted-foreground/50"
                  placeholder="Your district"
                />
              </div>

              {/* Upazila */}
              <div className="space-y-1.5">
                <label htmlFor="upazila" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <MapPin className="size-3.5 text-muted-foreground" />
                  Upazila
                </label>
                <input
                  id="upazila"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm
                             outline-none transition-all
                             focus:ring-2 focus:ring-primary/30 focus:border-primary
                             placeholder:text-muted-foreground/50"
                  placeholder="Your upazila"
                />
              </div>

            </div>
          </div>

          {/* Save button footer */}
          <div className="border-t border-border px-5 sm:px-8 py-4 sm:py-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold
                         text-primary-foreground shadow-md transition-all cursor-pointer
                         hover:bg-blood-deep hover:-translate-y-0.5 hover:shadow-lg
                         active:translate-y-0 active:shadow-md"
            >
              <Save className="size-4" />
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile;