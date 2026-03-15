import React from "react";

const DishcoveryLanding = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-linear-to-b from-rose-50 to-white">
      {/* Subtle decorative background blur */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-rose-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-100/60 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 animate-fade-in-up md:max-w-3xl">
        {/* Pill Badge */}
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold tracking-wide uppercase">
          Your Personal Cookbook
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          Dish<span className="text-rose-500">covery</span> 🍳
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Discover highly rated home-cooked dishes <br />Learn, cook, and savor
          every single bite with absolute ease.
        </p>

        {/* Button */}
        <div>
          <a
            href="#recipes"
            className="inline-flex items-center justify-center rounded-2xl bg-rose-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-500/40 active:scale-95"
          >
            Explore Recipes
          </a>
        </div>
      </div>
    </div>
  );
};

export default DishcoveryLanding;
