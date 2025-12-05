import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { user, refreshUser } = useContext(AuthContext); // optionally, a refreshUser function
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      setPhotoURL(photoURL);

      if (refreshUser) {
        refreshUser();
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <Toaster position="top-right" />
      <div className="max-w-xl mx-auto bg-base-100 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome, <span className="text-blue-500">{name || "User"}</span>!
        </h1>
        <div className="flex flex-col items-center mb-6">
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-500"
          />
          <p className="text-lg font-semibold">{user?.email}</p>
          <p className="text-gray-500 text-sm">
            Last login: {user?.metadata?.lastSignInTime || "N/A"}
          </p>
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="label">Profile Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              required
            />
          </div>

          <button
            type="submit"
            className="Btn-primary w-full mt-4"
            data-text={loading ? "Updating..." : "Update Profile"}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
