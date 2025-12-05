import React from "react";

const ChooseUs = () => {
  return (
    <div className="my-12 px-6 space-y-16">
      <section className="bg-blue-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center ">Why Choose <span className="text-blue-500">Us</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
            <p>Our professionals are highly trained and experienced to provide top-quality service every time.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
            <p>We offer competitive prices without compromising on the quality of service.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
            <p>We value your time and always strive to deliver services promptly and efficiently.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChooseUs;
