import React from 'react';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm">
              IdentiCore
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <motion.a 
              href="https://github.com/himani080" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;