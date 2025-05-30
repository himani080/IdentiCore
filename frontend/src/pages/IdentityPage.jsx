import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://13.203.218.89:3000';

const IdentityPage = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email && !phoneNumber) {
      setError('Please provide either an email or a phone number');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.post(`${API_URL}/identify`, {
        email: email || null,
        phoneNumber: phoneNumber || null
      });
      
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Identity Reconciliation Tool
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Enter an email, phone number, or both to identify and reconcile customer records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Section */}
            <motion.div 
              className="card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-10"
                      placeholder="user@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="input-field pl-10"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.button
                  type="submit"
                  className="btn btn-primary w-full flex justify-center items-center"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="loader"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Identify Contact
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Results Section */}
            <motion.div 
              className="card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Response</h2>
                {response && (
                  <motion.button
                    onClick={copyToClipboard}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </motion.button>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-md p-4 h-[300px] overflow-auto font-mono text-sm">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="loader"></div>
                  </div>
                ) : response ? (
                  <pre>{JSON.stringify(response, null, 2)}</pre>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center justify-center h-full">
                    <div className="mb-2">No data to display</div>
                    <div className="text-xs">Submit the form to see results</div>
                  </div>
                )}
              </div>
              
              {response && response.contact && (
                <ContactVisualization contact={response.contact} />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ContactVisualization = ({ contact }) => {
  const { primaryContactId, emails, phoneNumbers, secondaryContactIds } = contact;
  
  return (
    <motion.div 
      className="mt-6 border-t pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-3">Contact Visualization</h3>
      
      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <div className="font-medium text-blue-700 mb-1">Primary Contact (ID: {primaryContactId})</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-sm text-gray-500">Emails:</div>
            <ul className="list-disc list-inside">
              {emails.map((email, index) => (
                <li key={index} className="text-sm">{email}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone Numbers:</div>
            <ul className="list-disc list-inside">
              {phoneNumbers.map((phone, index) => (
                <li key={index} className="text-sm">{phone}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {secondaryContactIds.length > 0 && (
        <div>
          <div className="text-sm text-gray-500 mb-2">Secondary Contact IDs:</div>
          <div className="flex flex-wrap gap-2">
            {secondaryContactIds.map((id) => (
              <div key={id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                ID: {id}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default IdentityPage;