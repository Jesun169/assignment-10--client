const Banner = () => {
  return (
    <div
      className="relative h-screen flex items-center text-white"
      style={{
        backgroundImage: `url('/assets/mainbg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Reliable Home Services <br /> At Your Doorstep
        </h1>
        <p className="text-md sm:text-lg lg:text-xl mb-8 max-w-lg">
         “ServiceX helps you quickly find trusted local professionals for all your home needs—fast, easy, and reliable.”
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
            Book a Service
          </button>
          <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
