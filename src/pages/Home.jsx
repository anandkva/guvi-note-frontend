import React from "react";

export default function Home() {
  return (
    <>
      <div className="bg-blue-500 py-16">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Guvi's Goals</h1>
          <p className="text-lg mb-8">
            Empowering Individuals with Coding Skills
          </p>
          <a className="bg-white text-blue-700 py-2 px-6 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Learn More
          </a>
        </div>
      </div>
      <div className="container mx-auto p-8">
        {/* Rest of your page content goes here */}
      </div>
    </>
  );
}
