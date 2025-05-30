import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Database, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Identity Reconciliation",
      description: "Link and consolidate customer identities across different channels and touchpoints."
    },
    {
      icon: <Database className="h-10 w-10 text-indigo-600" />,
      title: "Contact Management",
      description: "Organize contacts with primary and secondary relationships for a single customer view."
    },
    {
      icon: <Zap className="h-10 w-10 text-pink-600" />,
      title: "Real-time Processing",
      description: "Process and reconcile customer identities in real-time as new data comes in."
    }
  ];

  return (
    <motion.div 
      className="py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="text-blue-600">Identity</span>Core
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Connect and consolidate customer identities across multiple touchpoints
          </p>
          <div className="mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/identity"
                className="btn btn-primary inline-flex items-center"
              >
                Try the Identity Tool
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={itemVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to unify your customer data?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Identicore empowers you to build a unified customer view by intelligently linking identities across multiple channels.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/identity"
              className="bg-white text-blue-600 font-medium py-2 px-6 rounded-md inline-flex items-center hover:bg-gray-100 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;