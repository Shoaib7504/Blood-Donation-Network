import { NavLink, useSearchParams } from "react-router";
import PaymentSuccessImg from "../../assets/2306.i402.024.F.m004.c9.Credit score flat background.jpg";
import { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const[searchParams]=useSearchParams()
  const sessionId=searchParams.get('session_id')
  console.log(sessionId);
 useEffect(() => {
  if (sessionId) {
    axios.post(
      `${import.meta.env.VITE_API_URL}/payment-success`,
      { sessionId }
    );
  }
}, [sessionId]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md h-100 rounded-2xl bg-white shadow-lg overflow-hidden">

        {/* IMAGE */}
        <img
          src={PaymentSuccessImg}
          alt="Payment Success"
          className="h-52 w-full object-cover"
        />

        {/* CONTENT */}
        <div className="p-6 text-center">

          <h1 className="text-2xl font-bold text-green-600">
            Payment Successful 🎉
          </h1>

          <p className="mt-3 mb-5 text-gray-500 text-sm">
            Your donation has been received successfully. Thank you for your support ❤️
          </p>

          <NavLink to='/' className=" px-3 w-full rounded-xl bg-green-500 py-2 text-white hover:bg-green-600">
            Go Back Home
          </NavLink>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;