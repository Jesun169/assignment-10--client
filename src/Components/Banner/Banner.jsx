import { Link } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      className="relative h-screen flex items-center text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/assets/mainbg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

      <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">

        <motion.h1
          className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Reliable Home <span className="text-blue-500">Services</span> <br /> At Your <span className="text-blue-500">Doorstep</span>
        </motion.h1>

        <motion.p
          className="text-md sm:text-lg lg:text-xl mb-8 max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          “ServiceX helps you quickly find trusted local professionals for all your home needs—fast, easy, and reliable.”
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Book a Service
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Banner;
