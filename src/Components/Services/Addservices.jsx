import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async e => {
    e.preventDefault();
    if (!name || !category || !price || !desc || !img) return toast.error("Fill all fields");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_name: name,
          category,
          price,
          description: desc,
          image_url: img,
          provider_name: user.displayName,
          email: user.email
        })
      });
      const data = await res.json();
      if (data.insertedId) toast.success("Service added!");
      else toast.error("Failed");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border-2 border-gray-200 rounded-2xl">
      <Toaster />
      <h1 className="text-2xl font-bold text-center mb-4">Add Service</h1>
      <form onSubmit={handleAdd} className="space-y-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Service Name" className="input input-bordered w-full" />
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="input input-bordered w-full" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="input input-bordered w-full" />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input value={img} onChange={e => setImg(e.target.value)} placeholder="Image URL" className="input input-bordered w-full" />
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Adding..." : "Add Service"}</button>
      </form>
    </div>
  );
};

export default AddService;
