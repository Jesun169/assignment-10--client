import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  // email/password login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Wrong email or password!");
      });
  };

  // google login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        if (!result || !result.user) {
          toast.error("Google login failed.");
          return;
        }

        toast.success("Login with Google successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.code === "auth/popup-closed-by-user") {
          toast.error("Google login popup closed.");
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <h1 className="text-4xl text-center font-bold">Login now!</h1>
          <div className="card-body">

            <form onSubmit={handleLogin} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </form>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <button
              type="button"
              className="btn bg-white text-black border-[#e5e5e5]"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="mr-2" /> Login with Google
            </button>

            <p className="font-bold mt-3">
              Don't have an account?
              <Link to="/register" className="text-red-500"> Sign up</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
