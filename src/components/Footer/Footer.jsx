import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6 text-center mt-7">
      <div className="container mx-auto px-4">
        <p className="text-white text-lg mb-4">Yash Kathoke</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <a href="https://x.com/notifications" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors duration-300">
            Twitter
          </a>
          <a href="https://github.com/yashKathoke" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors duration-300">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/yash-kathoke-97ba21249/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors duration-300">
            LinkedIn
          </a>
        </div>
        <p className="text-white text-sm">© {new Date().getFullYear()} Url Saver. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;