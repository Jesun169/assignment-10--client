import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const Hero = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data.slice(0, 5)))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-5">
          Our <span className="text-blue-500">Services</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Explore the best services we provide for you
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop={true}
          className="h-full"
        >
          {services.map((service) => (
            <SwiperSlide key={service._id}>
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  src={service.image_url}
                  alt={service.service_name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 text-white max-w-xl"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {service.service_name}
                  </h1>

                  <p className="text-lg md:text-xl mb-4">
                    {service.description}
                  </p>

                  <p className="text-yellow-400 font-semibold text-lg mb-6">
                    Starting at {service.price}
                  </p>

                  <motion.a
                    href="/services"
                    whileHover={{ scale: 1.05 }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
                  >
                    Explore
                  </motion.a>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Hero;
