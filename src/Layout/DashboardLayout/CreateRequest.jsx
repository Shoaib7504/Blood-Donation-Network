import { useMutation } from '@tanstack/react-query';
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CheckCircle2, X, Calendar, Clock } from 'lucide-react';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import LoadingSpiner from '../../Components/LoadingSpiner';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateRequest = () => {
 const { user } = useAuth()
 const axiosSecure = useAxiosSecure()
 const [showSuccess, setShowSuccess] = useState(false)

 // ── BD Location Data ──
 const [districts, setDistricts] = useState([])
 const [upazilas, setUpazilas] = useState([])
 const [selectedDistrictId, setSelectedDistrictId] = useState('')
 const [filteredUpazilas, setFilteredUpazilas] = useState([])

    // use mutation hook use for put ,patch,post method not for get data if you get data then use tanstack query
    const { isPending, isError, mutateAsync, reset: mutationRest } = useMutation({
        mutationFn: async (payload) =>
            await axiosSecure.post('/request', payload),

        onSuccess: data => {
            console.log(data);
            toast.success('Your request successfully submitted')
            setShowSuccess(true)
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

    // Auto-dismiss the success alert after 5 seconds
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    // Fetch districts and upazilas JSON on mount
    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => {
                // The JSON has header/database meta entries; the actual data is in the table object
                const tableEntry = data.find(item => item.type === 'table' && item.name === 'districts')
                if (tableEntry) {
                    setDistricts(tableEntry.data)
                }
            })
            .catch(err => console.error('Failed to load districts:', err))

        fetch('/upazilas.json')
            .then(res => res.json())
            .then(data => {
                const tableEntry = data.find(item => item.type === 'table' && item.name === 'upazilas')
                if (tableEntry) {
                    setUpazilas(tableEntry.data)
                }
            })
            .catch(err => console.error('Failed to load upazilas:', err))
    }, [])

    // Filter upazilas when selected district changes
    useEffect(() => {
        if (selectedDistrictId) {
            const filtered = upazilas.filter(u => u.district_id === selectedDistrictId)
            setFilteredUpazilas(filtered)
        } else {
            setFilteredUpazilas([])
        }
        // Reset upazila selection when district changes
        setValue('upazila', '')
    }, [selectedDistrictId, upazilas])


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const onSubmit = async data => {
        // console.log(data);
        const { name, district, upazila, contact, note, hospital, blood, date, time } = data

        try {
            const requestData = {
                name,
                location: `${district}, ${upazila}, ${hospital}`,
                blood,
                date,
                time,
                contact,
                note,
                user:user.email
               
            }
            await mutateAsync(requestData)
            // const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/request`, requestData)
            // console.log(data);
            reset()
            setSelectedDistrictId('')
        } catch (error) {
            console.log(error);

        }
    };
    if (isPending) return <LoadingSpiner></LoadingSpiner>
    if (isError) return <ErrorPage></ErrorPage>


    return (
        <div className='px-4 sm:px-6 lg:px-10 pb-10'>

            {/* ── Success Alert Banner ── */}
            {showSuccess && (
                <div
                    className="mt-4 flex items-center gap-3 sm:gap-4 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 sm:px-6 py-4 shadow-lg animate-[slideDown_0.4s_ease-out]"
                    role="alert"
                    id="success-alert"
                >
                    <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                        <CheckCircle2 className="size-4 sm:size-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="font-display text-base sm:text-lg font-bold text-green-800">
                            Request Submitted!
                        </p>
                        <p className="text-xs sm:text-sm text-green-600">
                            Your blood request has been submitted successfully. We'll notify nearby donors right away.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowSuccess(false)}
                        className="shrink-0 rounded-xl p-2 text-green-400 transition hover:bg-green-100 hover:text-green-600 cursor-pointer"
                        aria-label="Dismiss"
                    >
                        <X className="size-5" />
                    </button>
                </div>
            )}

            {/* ── Hero Header ── */}
            <section className="bg-hero-medical border-b mx-auto rounded-xl mb-6 mt-5 border-border overflow-hidden">
                <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-black">
                        Create Blood Request
                    </h1>
                    <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground">
                        Fill in the details below to submit an urgent blood request. We'll connect you with nearby donors.
                    </p>
                </div>
            </section>

            {/* ── Form Card ── */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl sm:rounded-3xl border bg-white p-4 sm:p-6 lg:p-8 shadow-md space-y-5"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

                    {/* Recipient */}
                    <div className="space-y-2">
                        <label htmlFor="recipient" className="text-sm font-semibold text-foreground">
                            Recipient name <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="recipient"
                            {...register("name", { required: "Recipient name is required" })}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow"
                            placeholder="Enter recipient's full name"
                        />
                        {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Blood Group */}
                    <div className="space-y-2">
                        <label htmlFor="blood" className="text-sm font-semibold text-foreground">
                            Blood group <span className="text-red-400">*</span>
                        </label>
                        <select
                            id="blood"
                            {...register("blood", { required: "Blood group is required" })}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer"
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
                            <p className="text-red-500 text-xs sm:text-sm">{errors.blood.message}</p>
                        )}
                    </div>

                    {/* District */}
                    <div className="space-y-2">
                        <label htmlFor="district" className="text-sm font-semibold text-foreground">
                            District <span className="text-red-400">*</span>
                        </label>
                        <select
                            id="district"
                            {...register("district", { required: "District is required" })}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer"
                            onChange={(e) => {
                                const selectedName = e.target.value
                                const district = districts.find(d => d.name === selectedName)
                                setSelectedDistrictId(district ? district.id : '')
                                setValue('district', selectedName)
                            }}
                        >
                            <option value="">Select District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.name}>
                                    {d.name} ({d.bn_name})
                                </option>
                            ))}
                        </select>
                        {errors.district && <p className="text-red-500 text-xs sm:text-sm">{errors.district.message}</p>}
                    </div>

                    {/* Upazila */}
                    <div className="space-y-2">
                        <label htmlFor="upazila" className="text-sm font-semibold text-foreground">
                            Upazila <span className="text-red-400">*</span>
                        </label>
                        <select
                            id="upazila"
                            {...register("upazila", { required: "Upazila is required" })}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!selectedDistrictId}
                        >
                            <option value="">
                                {selectedDistrictId ? 'Select Upazila' : '-- Select a district first --'}
                            </option>
                            {filteredUpazilas.map(u => (
                                <option key={u.id} value={u.name}>
                                    {u.name} ({u.bn_name})
                                </option>
                            ))}
                        </select>
                        {errors.upazila && <p className="text-red-500 text-xs sm:text-sm">{errors.upazila.message}</p>}
                    </div>

                    {/* Hospital */}
                    <div className="space-y-2">
                        <label htmlFor="hospital" className="text-sm font-semibold text-foreground">
                            Hospital
                        </label>
                        <input
                            id="hospital"
                            {...register("hospital")}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow"
                            placeholder="Hospital name"
                        />
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                        <label htmlFor="contact" className="text-sm font-semibold text-foreground">
                            Contact number <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="contact"
                            {...register("contact", { required: "Contact is required" })}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow"
                            placeholder="e.g. 01XXXXXXXXX"
                        />
                        {errors.contact && <p className="text-red-500 text-xs sm:text-sm">{errors.contact.message}</p>}
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                            <Calendar className="size-4 text-primary" />
                            Donation date <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="date"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            onClick={(e) => {
                                if (typeof e.target.showPicker === "function") {
                                    e.target.showPicker();
                                }
                            }}
                            {...register("date", { required: "Donation date is required" })}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer"
                        />
                        {errors.date && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.date.message}</p>}
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                            <Clock className="size-4 text-primary" />
                            Donation time <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="time"
                            type="time"
                            onClick={(e) => {
                                if (typeof e.target.showPicker === "function") {
                                    e.target.showPicker();
                                }
                            }}
                            {...register("time", { required: "Donation time is required" })}
                            className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer"
                        />
                        {errors.time && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.time.message}</p>}
                    </div>

                </div>

                {/* Note — full width */}
                <div className="space-y-2">
                    <label htmlFor="note" className="text-sm font-semibold text-foreground">
                        Medical note
                    </label>
                    <textarea
                        id="note"
                        rows={4}
                        {...register("note")}
                        className="w-full rounded-xl sm:rounded-2xl border border-input bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow resize-y min-h-[100px]"
                        placeholder="Any additional medical details or instructions…"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full sm:w-auto mt-2 cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg active:scale-[0.98] transition-all"
                >
                    + Create Request
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;