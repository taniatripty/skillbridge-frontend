import { bookingServices } from '@/services/booking.services'
import React from 'react'

export default async function StudentDashboard() {
  const {data}=await bookingServices.getMyBookingstatus()
  console.log(data)
  return (
    <div className="w-11/12 mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">My Booking Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm font-medium mb-2">Total Bookings</p>
          <p className="text-3xl font-bold text-blue-600">{data.data.total}</p>
        </div>

        {/* Confirmed Bookings */}
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm font-medium mb-2">Confirmed</p>
          <p className="text-3xl font-bold text-green-600">{data.data.confirmed}</p>
        </div>

        {/* Completed Bookings */}
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm font-medium mb-2">Completed</p>
          <p className="text-3xl font-bold text-purple-600">{data.data.completed}</p>
        </div>

        {/* Cancelled Bookings */}
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm font-medium mb-2">Cancelled</p>
          <p className="text-3xl font-bold text-red-600">{data.data.cancelled}</p>
        </div>
      </div>
    </div>
  )
}
