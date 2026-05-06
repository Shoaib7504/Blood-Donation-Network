// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';

const Profile = () => {
  const { user } = useAuth()
  // console.log(user);
  const { role, isReloading } = useRole()
  console.log(role, isReloading);


  return (
    <div className='px-10'>

      <section className="bg-hero-medical border-b mx-auto rounded-xl mb-1 mt-5 border-border">
        <div className="  px-4 py-16  sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">profile
          </h1>
          <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">A calm editable profile card layout for donor identity and contact details.

          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="text-center">
          <div className="w-20 border-2 flex mx-auto justify-items-center border-gray-300 rounded-full">
            <img
              className="rounded-2xl"
              alt="Tailwind CSS Navbar component"
              referrerPolicy="no-referrer"
              src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold">{user.displayName}</h2>
          <p className="text-muted-foreground">{role}</p>
          <p>{user.email}</p>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                className="mt-1 min-h-10 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                placeholder="Full name"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="mt-1 min-h-10 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                className="mt-1 min-h-10 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                placeholder="Phone"
              />
            </div>

            <div>
              <label htmlFor="district">District</label>
              <input
                id="district"
                className="mt-1 min-h-10 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                placeholder="District"
              />
            </div>

            <div>
              <label htmlFor="upazila">Upazila</label>
              <input
                id="upazila"
                className="mt-1 min-h-10 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                placeholder="Upazila"
              />
            </div>

            <div>
              <label htmlFor="blood">Blood group</label>
              <input
                id="blood"
                className="mt-1 min-h-10 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                placeholder="Blood group"
              />
            </div>

          </div>

          <button type='submit'
            className="mt-6 cursor-pointer px-3 py-2 rounded-2xl bg-primary text-primary-foreground shadow-glow hover:bg-blood-deep hover:-translate-y-0.5">
            Save Changes
          </button>
        </form>


      </div>
    </div>
  );
};

export default Profile;