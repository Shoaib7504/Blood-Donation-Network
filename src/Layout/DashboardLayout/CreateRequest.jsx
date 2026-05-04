import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';

const CreateRequest = () => {
    // use mutation hook use for put ,patch,post method not for get data if you get data then use tanstack query
    const { isPending, isError, mutateAsync, reset: mutationRest } = useMutation({
        mutationFn: async (payload) =>
            await axios.post(`${import.meta.env.VITE_API_URL}/request`, payload),

        onSuccess: data => {
            console.log(data);
            toast.success('Your request successfully submitted')
            mutationRest()

        },
        onError: error => {
            console.log(error);

        },
        onMutate: payload => {
            console.log('i will post this data....', payload);

        },
        onSettled: (data, error) => {
            if (data) console.log(data);
            if (error) console.log(error);
        },
        retry: 3,

    })




    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async data => {
        console.log(data);
        const { recipient, district, hospital, blood, date, time } = data

        try {
            const requestData = {
                recipient,
                district,
                hospital,
                blood,
                date,
                time
            }
            await mutateAsync(requestData)
            // const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/request`, requestData)
            // console.log(data);
            reset()
        } catch (error) {
            console.log(error);

        }
    };
    if (isPending) <span class="loading loading-spinner loading-lg"></span>
    if (isError) return <ErrorPage></ErrorPage>


    return (
        <div className='px-10'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <section className="bg-hero-medical border-b mx-auto rounded-xl mb-1 mt-5 border-border">
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">
                        Create Blood Request
                    </h1>
                    <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">
                        Beautiful two-column form layout with clear urgency and medical context.
                    </p>
                </div>
            </section>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border bg-white p-6 shadow-md"
            >
                <div className="grid grid-cols-2 gap-4">

                    {/* Recipient */}
                    <div>
                        <label htmlFor="recipient">Recipient name</label>
                        <input
                            id="recipient"
                            {...register("recipient", { required: "Recipient name is required" })}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                            placeholder="Recipient name"
                        />
                        {errors.recipient && <p className="text-red-500">{errors.recipient.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="blood">Blood group</label>
                        <select
                            id="blood"
                            {...register("blood", { required: "Blood group is required" })}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        {errors.blood && (
                            <p className="text-red-500">{errors.blood.message}</p>
                        )}
                    </div>

                    {/* Hospital */}
                    <div>
                        <label htmlFor="hospital">Hospital</label>
                        <input
                            id="hospital"
                            {...register("hospital")}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                            placeholder="Hospital"
                        />
                    </div>

                    {/* District */}
                    <div>
                        <label htmlFor="district">District</label>
                        <input
                            id="district"
                            {...register("district")}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                            placeholder="District"
                        />
                    </div>

                    {/* Upazila */}
                    <div>
                        <label htmlFor="upazila">Upazila</label>
                        <input
                            id="upazila"
                            {...register("upazila")}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                            placeholder="Upazila"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="date">Donation date</label>
                        <input
                            id="date"
                            type="date"
                            {...register("date", { required: true })}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                        />
                    </div>

                    {/* Time */}
                    <div>
                        <label htmlFor="time">Donation time</label>
                        <input
                            id="time"
                            type="time"
                            {...register("time", { required: true })}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label htmlFor="contact">Contact number</label>
                        <input
                            id="contact"
                            {...register("contact", { required: "Contact is required" })}
                            className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                            placeholder="Contact number"
                        />
                    </div>

                </div>

                {/* Note */}
                <div>
                    <label htmlFor="note">Medical note</label>
                    <textarea
                        id="note"
                        {...register("note")}
                        className="mt-4 min-h-18 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring input"
                        placeholder="Medical note"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 cursor-pointer flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white"
                >
                    + Create Request
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;