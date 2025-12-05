import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

    fetch("http://localhost:3000/services/filter?" + params.toString())
      .then((res) => res.json())
      .then((data) => setServices(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-10">

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

      {loading ? (
        <span className="loading loading-dots"></span>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s._id} className="card bg-base-100 shadow-xl">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
