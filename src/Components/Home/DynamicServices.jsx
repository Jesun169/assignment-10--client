import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DynamicServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://assignment-10-server-ten-omega.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data.slice(0, 6)))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-extrabold text-gray-900">
          Our Top <span className="text-blue-500">Services</span>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore our top service offerings
        </p>
      </motion.div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={service.image_url}
              alt={service.service_name}
              className="w-full h-56 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">
                {service.service_name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {service.description.slice(0, 80)}...
              </p>

              <p className="text-yellow-500 font-bold mb-4">
                {service.price}
              </p>

              <motion.a
                href={`/services/${service._id}`}
                whileHover={{ scale: 1.05 }}
                className="block w-full text-center bg-yellow-500 text-black py-2 rounded-md font-semibold hover:bg-yellow-600"
              >
                View Details
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <motion.a
          href="/services"
          whileHover={{ scale: 1.05 }}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          View All Services
        </motion.a>
      </motion.div>
    </section>
  );
};

export default DynamicServices;
