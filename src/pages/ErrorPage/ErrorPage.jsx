// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (

        <div className="relative h-screen w-full overflow-hidden">

            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://cdn.dribbble.com/userupload/15144569/file/original-850c1678b43c38a61c013cbac8dcd653.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                <h1 className="text-7xl font-bold">404</h1>
                <p className="mt-4 text-lg">Oops! Page not found</p>

                <Link to="/" className="mt-6 px-6 py-2 bg-secondary text-red-500 rounded-lg transition">
                    Go Home
                </Link>
            </div>

        </div>

    );
};

export default ErrorPage;