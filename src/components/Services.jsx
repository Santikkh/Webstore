import React from 'react';
import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaTruck />,
      title: 'Free Shipping',
      description: 'On all orders over $50',
    },
    {
      id: 2,
      icon: <FaUndo />,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      id: 3,
      icon: <FaShieldAlt />,
      title: 'Secure Payment',
      description: '100% protected payments',
    },
    {
      id: 4,
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Always here to help',
    },
  ];

  return (
    <>
      {/* Google Font: Inter (matches navbar & slideshow) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <section className="bg-white py-16 md:py-20 font-inter border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Shop With Us
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Everything you need for a smooth shopping experience
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group p-6 md:p-8 bg-gray-50 rounded-2xl hover:bg-gray-900 transition-colors duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <span className="text-gray-900 group-hover:text-white text-lg transition-colors duration-300">
                    {service.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;