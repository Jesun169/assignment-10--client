import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        };

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log('Backend response:', data);
          if (data.user) {
            console.log('User info:', data.user.name, data.user.email);
          }
          navigate('/'); // redirect after successful login
        })
        .catch(err => console.error('Error saving user:', err));
      })
      .catch(err => console.error('Google sign-in error:', err));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <h1 className="text-4xl text-center font-bold m-1">Register Your Account</h1>
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Service Name</label>
              <input type="text" className="input" placeholder="Service Name" required />

              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" required />

              <label className="label">Photo URL</label>
              <input type="text" className="input" placeholder="Photo URL" required />

              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" required />

              <button className="btn btn-neutral mt-4">Register</button>

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
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
