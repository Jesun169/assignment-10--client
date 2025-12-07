import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then(() => {
        toast.success("Registration successful!"); 
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        };

        fetch('https://assignment-10-server-ten-omega.vercel.app/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })
          .then(res => res.json())
          .then(() => {
            toast.success("Login with Google successful!"); 
            navigate('/');
          })
          .catch(err => console.error('Error saving user:', err));
      })
      .catch(err => console.error('Google sign-in error:', err));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} /> 
      <div className="hero-content flex-col lg:flex-row-reverse">

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <h1 className="text-4xl text-center font-bold m-1">Register Your Account</h1>

          <div className="card-body">
            <form onSubmit={handleRegister} className="fieldset">

              <label className="label">Name</label>
              <input type="text" name="name" className="input" placeholder="Enter your name" required />

              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" required />

              <label className="label">Photo URL</label>
              <input type="text" name="photo" className="input" placeholder="Photo URL" required />

              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" required />
              {error && (
                <p className="text-red-500 mt-2 font-semibold">{error}</p>
              )}

              <button className="btn btn-neutral mt-4">Register</button>
            </form>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <FcGoogle className="inline mr-2" /> Login with Google
            </button>

            <p className="font-bold mt-3">
              Already have an account?
              <Link to="/login" className="text-red-500"> Login</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
