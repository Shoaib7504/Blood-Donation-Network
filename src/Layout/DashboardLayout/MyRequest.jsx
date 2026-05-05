import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import LoadingSpiner from '../../Components/LoadingSpiner';
import RequestCard from '../../Components/RequestCard/RequestCard';
import useAuth from '../../Hooks/useAuth';

const MyRequest = () => {
    const {user} =useAuth()
       const { data: myRequest, isLoading, isError } = useQuery({
        queryKey: ["myRequest",user?.email],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/my-request/${user?.email}`)
            return result.data
        }
    })
    console.log(myRequest);
    

    if (isLoading) return <LoadingSpiner></LoadingSpiner>
    if (isError) console.log(isError);
    return (
        <div className='px-10'>
            <section className="bg-hero-medical border-b mx-auto rounded-xl mb-1 mt-5 border-border">
                <div className="  px-4 py-16  sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">My Requests
                    </h1>
                    <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">All request cards keep statuses, actions, and urgency easy to scan.

                    </p>
                </div>
            </section>
            <div className="grid gap-5 lg:grid-cols-2">
                {myRequest.map((request) => <RequestCard key={request.name} request={request} />)}
            </div>

        </div>
    );
};

export default MyRequest;