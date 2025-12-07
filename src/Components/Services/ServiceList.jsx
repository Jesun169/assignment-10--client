import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchFiltered = () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (minPrice) params.append("min", minPrice);
    if (maxPrice) params.append("max", maxPrice);

    fetch("https://assignment-10-server-ten-omega.vercel.app/services/filter?" + params.toString())
      .then((res) => res.json())
      .then((data) => setServices(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch("https://assignment-10-server-ten-omega.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-10">

      {/* Filter Inputs */}
      <div className="flex gap-3 mb-5">
        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button className="btn btn-primary" onClick={fetchFiltered}>
          Filter
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <span className="loading loading-dots"></span>
      ) : (
        <motion.div
          layout
          className="grid md:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {services.map((s) => (
              <motion.div
                key={s._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="card bg-base-100 shadow-xl"
              >
                <figure>
                  <img className="h-60 w-full object-cover" src={s.image_url} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{s.service_name}</h2>
                  <p>{s.description}</p>
                  <p className="font-bold">Price: {s.price}</p>
                  <Link to={`/services/${s._id}`}>
                    <button className="btn btn-primary">Details</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceList;
