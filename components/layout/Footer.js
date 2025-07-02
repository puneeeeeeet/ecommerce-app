import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center rounded-t-lg mt-8">
      &copy; {new Date().getFullYear()} E-commerce App
    </footer>
  );
};

export default Footer;