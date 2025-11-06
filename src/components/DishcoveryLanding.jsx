import React from "react";

const DishcoveryLanding = () => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col justify-center items-center text-center px-4">
      {/* Hero Text */}
      <h1
        className="text-5xl md:text-7xl font-extrabold text-[#3A2E2E] mb-4"
      >
        Dish<span className="text-[#E63946]">covery</span> 🍳
      </h1>

      {/* Tagline */}
        <p
        className="text-lg md:text-xl text-[#3A2E2E]/80 max-w-xl mb-8"
      >
        Discover Nigeria’s favorite home-cooked dishes — learn, cook, and savor
        every bite with ease.
      </p>

      {/* Button */}
        <div
      >
        <a
          href="#recipes"
          className="bg-[#E63946] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E63946]/80 transition-all duration-300 shadow-md hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default DishcoveryLanding;
