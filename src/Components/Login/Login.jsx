import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router"
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-4xl text-center font-bold">Login now!</h1>
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div><a className="link link-hover">Forgot password?</a></div>
              <button className="btn btn-neutral mt-4">Login</button>

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
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
