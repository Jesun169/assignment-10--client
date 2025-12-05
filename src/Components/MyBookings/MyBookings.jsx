import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/bookings?userEmail=${user.email}`);
      const data = await res.json();

      const bookingsWithService = await Promise.all(
        data.map(async (booking) => {
          const serviceRes = await fetch(`http://localhost:3000/services/${booking.serviceId}`);
          const service = await serviceRes.json();
          return {
            ...booking,
            service_name: service?.service_name || "Unknown",
            category: service?.category || "Unknown",
            provider_name: service?.provider_name || "Unknown",
            description: service?.description || "",
          };
        })
      );

      setBookings(bookingsWithService);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.email]);


  const handleCancel = async (id) => {
    const confirmCancel = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col gap-3">
            <p>Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-error"
                onClick={() => {
                  resolve(true);
                  toast.dismiss(t.id);
                }}
              >
                Yes
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  resolve(false);
                  toast.dismiss(t.id);
                }}
              >
                No
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    });

    if (!confirmCancel) return;

    try {
      const res = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedId) {
        toast.success("Booking cancelled successfully!");
        setBookings(bookings.filter((b) => b._id !== id));
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while cancelling.");
    }
  };

  

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {loading ? (
        <p><span className="loading loading-dots loading-xl"></span>
</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Service Name</th>
                <th>Category</th>
                <th>Provider</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking._id} className="hover">
                  <td>{idx + 1}</td>
                  <td>{booking.service_name}</td>
                  <td>{booking.category}</td>
                  <td>{booking.provider_name}</td>
                  <td>{booking.price}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
