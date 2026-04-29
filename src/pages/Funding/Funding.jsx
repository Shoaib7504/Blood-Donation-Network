import { WalletCards } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import React from 'react';



const Funding = () => {

    const items = [
        "Emergency transport",
        "Medical screening",
        "Community drives"
    ];

    return (

        <div>
            <section className="bg-hero-medical border-b  rounded-xl mb-1 mt-5 border-border">
                <div className="mx-auto  px-4 py-16  sm:px-6 lg:px-8">
                    <h1 className="font-display ml-20 text-4xl font-black sm:text-6xl">Funding
                    </h1>
                    <p className="mt-4 max-w-2xl ml-20   text-lg text-muted-foreground">Support campaigns that help transport donors, test blood, and amplify urgent requests.



                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">

                {items.map((item, index) => (
                    <article
                        key={item}
                        className="rounded-3xl hover-lift border bg-white p-7 shadow-sm hover:shadow-md transition"
                    >
                        <WalletCards className="h-10 w-10 text-red-500" />

                        <h3 className="mt-5 text-xl font-bold">
                            {item}
                        </h3>

                        <p className="mt-3 text-sm text-gray-500">
                            Transparent UI cards for donation funding campaigns and impact goals.
                        </p>

                        {/* Progress bar */}
                        <div className="mt-6 h-5 rounded-full bg-gray-200">
                            <div
                                className="h-5 rounded-full bg-red-500"
                                style={{ width: `${55 + index * 12}%` }}
                            />
                        </div>

                        <button className="mt-6 rounded-2xl py-2 w-full bg-blush text-primary hover:bg-accent hover:-translate-y-0.5">
                            Contribute
                        </button>
                    </article>
                ))}

            </section>
        </div>
    );
};

export default Funding;