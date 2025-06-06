import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://52.66.243.92:3000';

const AdminPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`${API_URL}/identify/contacts`);
      setContacts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch contacts');
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleRefresh = () => {
    fetchContacts();
  };

  const filteredContacts = contacts.filter(contact => {
    return (
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.phoneNumber && contact.phoneNumber.includes(searchTerm)) ||
      contact.id.toString().includes(searchTerm) ||
      (contact.linkedId && contact.linkedId.toString().includes(searchTerm))
    );
  });

  // Group contacts by primary/secondary
  const primaryContacts = filteredContacts.filter(c => c.linkPrecedence === 'primary');
  const secondaryContacts = filteredContacts.filter(c => c.linkPrecedence === 'secondary');

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Admin Dashboard
            </h1>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 w-64"
                  placeholder="Search by email, phone, ID..."
                />
              </div>
              
              <motion.button
                onClick={handleRefresh}
                className="btn bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </motion.button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              <ContactSection
                title="Primary Contacts"
                contacts={primaryContacts}
                isPrimary={true}
                allContacts={contacts}
              />
              
              <ContactSection
                title="Secondary Contacts"
                contacts={secondaryContacts}
                isPrimary={false}
                allContacts={contacts}
              />
            </div>
          )}

          <div className="mt-8 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium mb-2">Admin Dashboard Guide</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Primary contacts are the main identity records</li>
              <li>Secondary contacts are linked to a primary contact</li>
              <li>Use the search box to filter contacts by any field</li>
              <li>Click on a primary contact to see all its linked secondary contacts</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ContactSection = ({ title, contacts, isPrimary, allContacts }) => {
  const [expandedContactId, setExpandedContactId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedContactId(expandedContactId === id ? null : id);
  };

  // Get secondary contacts for a primary
  const getSecondariesForPrimary = (primaryId) => {
    return allContacts.filter(c => 
      c.linkPrecedence === 'secondary' && c.linkedId === primaryId
    );
  };

  // Get primary for a secondary
  const getPrimaryForSecondary = (linkedId) => {
    return allContacts.find(c => c.id === linkedId);
  };

  return (
    <div>
      <h2 className="section-title flex items-center">
        {title}
        <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
          {contacts.length}
        </span>
      </h2>
      
      {contacts.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-md text-gray-500 text-center">
          No {isPrimary ? 'primary' : 'secondary'} contacts found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isPrimary ? 'Secondary IDs' : 'Linked To'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <React.Fragment key={contact.id}>
                  <motion.tr
                    className={`${isPrimary && 'cursor-pointer hover:bg-gray-50'}`}
                    onClick={() => isPrimary && toggleExpand(contact.id)}
                    whileHover={isPrimary ? { backgroundColor: '#f9fafb' } : {}}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.phoneNumber || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {isPrimary ? (
                        getSecondariesForPrimary(contact.id).length > 0 ? (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {getSecondariesForPrimary(contact.id).length} linked contacts
                          </span>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )
                      ) : (
                        <span className="text-blue-600">Primary #{contact.linkedId}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                  </motion.tr>
                  
                  {isPrimary && expandedContactId === contact.id && getSecondariesForPrimary(contact.id).length > 0 && (
                    <tr>
                      <td colSpan={5}>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50 p-4"
                        >
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Linked Secondary Contacts</h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                  </th>
                                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                  </th>
                                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone Number
                                  </th>
                                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {getSecondariesForPrimary(contact.id).map((secondary) => (
                                  <tr key={secondary.id}>
                                    <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                                      {secondary.id}
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-500">
                                      {secondary.email || '-'}
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-500">
                                      {secondary.phoneNumber || '-'}
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-500">
                                      {new Date(secondary.createdAt).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;