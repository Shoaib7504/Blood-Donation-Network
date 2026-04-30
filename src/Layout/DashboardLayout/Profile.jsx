// eslint-disable-next-line no-unused-vars
import React from 'react';

const Profile = () => {
    return (
        <div>
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="text-center">
          <span className="mx-auto flex size-24 items-center justify-center rounded-full bg-blush font-display text-3xl font-bold text-primary">
            AR
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold">Ayesha Rahman</h2>
          <p className="text-muted-foreground">O+ verified donor</p>
        </div>
       
        <button  className="mt-6 px-3 py-2 rounded-2xl bg-primary text-primary-foreground shadow-glow hover:bg-blood-deep hover:-translate-y-0.5">
          Save Changes
        </button>
      </div>
        </div>
    );
};

export default Profile;