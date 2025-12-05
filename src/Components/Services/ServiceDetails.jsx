import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  const handleBooking = () => {
    if (!bookingDate) {
      toast.error("Please select a booking date");
      return;
    }

    const booking = {
      userEmail: user.email,
      serviceId: service._id,
      bookingDate,
      price: service.price,
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Booking successful!");
        setShowModal(false);
        setBookingDate("");
      })
      .catch(() => {
        toast.error("Booking failed. Try again.");
      });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (!service)
    return (
      <p className="text-center mt-10">
        <span className="loading loading-dots loading-xl"></span>
      </p>
    );

  const isOwner = user?.email === service.email;

  return (
    <motion.div
      className="p-4 max-w-xl mx-auto border shadow-xl rounded-lg mt-10 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-right" />

      <motion.h2
        className="text-3xl font-bold mb-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {service.service_name}
      </motion.h2>

      <motion.img
        src={service.image_url}
        alt=""
        className="mb-4 rounded-lg shadow-md w-full max-h-[350px] object-cover"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      />

      <motion.p
        className="my-2 text-gray-700 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {service.description}
      </motion.p>

      <motion.p
        className="my-2 text-gray-700 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        >
          Provider: {service.provider_name}
      </motion.p>

      <motion.p
        className="font-semibold text-xl mt-3 text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Price: {service.price}
      </motion.p>

      {user ? (
        <>
          <motion.button
            onClick={() => {
              if (isOwner) {
                toast.error("You cannot book your own service!");
              } else {
                openModal();
              }
            }}
            className={`btn mt-6 w-full ${
              isOwner ? "btn-disabled btn-outline" : "btn-primary"
            }`}
            whileHover={{ scale: isOwner ? 1 : 1.05 }}
            whileTap={{ scale: isOwner ? 1 : 0.95 }}
          >
            {isOwner ? "You Can't Book Your Own Services" : "Book Now"}
          </motion.button>

          <AnimatePresence>
            {showModal && (
              <motion.div
                className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className="absolute top-2 right-2 text-red-500 font-bold"
                    onClick={closeModal}
                  >
                    X
                  </button>

                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Book Service:{" "}
                    <span className="text-blue-600">{service.service_name}</span>
                  </h3>

                  <p className="mb-2 text-gray-700 font-medium text-center">
                    Price: {service.price}
                  </p>

                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="border p-2 w-full rounded mb-4"
                    required
                  />

                  <motion.button
                    onClick={handleBooking}
                    className="btn btn-primary w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Confirm Booking
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.button
          className="btn btn-outline btn-primary mt-6 w-full"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/login">Please log in to book</Link>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ServiceDetails;
