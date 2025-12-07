import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editData, setEditData] = useState({
    service_name: "",
    price: "",
    category: "",
  });

  const userId = localStorage.getItem("userId");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/services?userId=${userId}`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      toast.error("Failed to fetch services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`http://localhost:3000/services/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedId) {
        toast.success("Service deleted!");
        setServices(services.filter((s) => s._id !== id));
      } else {
        toast.error("Failed to delete service");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setEditData({
      service_name: service.service_name,
      price: service.price,
      category: service.category,
    });
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setSelectedService(null);
  };

  const handleUpdate = async () => {
    if (!selectedService) return;

    try {
      const res = await fetch(
        `http://localhost:3000/services/${selectedService._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      const data = await res.json();

      if (data.modifiedCount) {
        toast.success("Service updated!");
        setServices(
          services.map((s) =>
            s._id === selectedService._id ? { ...s, ...editData } : s
          )
        );
      } else {
        toast.error("Failed to update service");
      }

      closeEditModal();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">My Services</h1>

      {loading ? (
        <p><span className="loading loading-dots loading-xl"></span></p>
      ) : services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Service Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <motion.tr
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="hover"
                >
                  <td>{idx + 1}</td>
                  <td>{service.service_name}</td>
                  <td>{service.category}</td>
                  <td>{service.price}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openEditModal(service)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {editModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-2 text-red-500 font-bold"
                onClick={closeEditModal}
              >
                X
              </button>

              <h2 className="text-2xl font-bold mb-4">Update Service</h2>

              <input
                type="text"
                value={editData.service_name}
                onChange={(e) =>
                  setEditData({ ...editData, service_name: e.target.value })
                }
                className="input input-bordered w-full mb-3"
                placeholder="Service Name"
              />

              <input
                type="text"
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                className="input input-bordered w-full mb-3"
                placeholder="Category"
              />

              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                className="input input-bordered w-full mb-4"
                placeholder="Price"
              />

              <motion.button
                className="btn btn-primary w-full"
                onClick={handleUpdate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyServices;
