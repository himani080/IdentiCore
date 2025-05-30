import { ContactModel } from '../models/contact.js';

export const IdentityService = {
  identify: async (email, phoneNumber) => {
    // Validate input
    if (!email && !phoneNumber) {
      throw new Error('At least one of email or phoneNumber is required');
    }

    // Find all contacts that match the email or phone
    const contacts = await ContactModel.findByEmailOrPhone(email, phoneNumber);

    // If no contacts found, create a new primary contact
    if (contacts.length === 0) {
      const newContactId = await ContactModel.create({
        email,
        phoneNumber,
        linkPrecedence: 'primary'
      });
      
      return {
        contact: {
          primaryContactId: newContactId,
          emails: email ? [email] : [],
          phoneNumbers: phoneNumber ? [phoneNumber] : [],
          secondaryContactIds: []
        }
      };
    }

    // Find all primary contacts
    const primaryContacts = contacts.filter(c => c.linkPrecedence === 'primary');
    
    // If multiple primary contacts exist, we need to consolidate them
    if (primaryContacts.length > 1) {
      // Sort by creation date to determine the oldest primary
      primaryContacts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      const oldestPrimary = primaryContacts[0];
      const newerPrimaries = primaryContacts.slice(1);
      
      // Convert newer primaries to secondary
      for (const primary of newerPrimaries) {
        await ContactModel.updateToSecondary(primary.id, oldestPrimary.id);
        
        // Also update any secondary contacts of this primary
        const secondaries = await ContactModel.findSecondariesByPrimaryId(primary.id);
        for (const secondary of secondaries) {
          await ContactModel.updateToSecondary(secondary.id, oldestPrimary.id);
        }
      }
    }

    // After consolidation, get the single primary contact
    const primaryContact = primaryContacts.length > 0 
      ? primaryContacts[0] 
      : await ContactModel.findPrimaryById(contacts[0].linkedId);
    
    // Get all secondary contacts
    const secondaryContacts = await ContactModel.findSecondariesByPrimaryId(primaryContact.id);
    
    // Check if we need to create a new secondary contact
    const allContacts = [primaryContact, ...secondaryContacts];
    const hasExactMatch = allContacts.some(c => 
      (email && phoneNumber) && c.email === email && c.phoneNumber === phoneNumber
    );
    const hasEmailMatch = allContacts.some(c => email && c.email === email);
    const hasPhoneMatch = allContacts.some(c => phoneNumber && c.phoneNumber === phoneNumber);
    
    // If both email and phone are provided, but no contact has both, create a new secondary
    if (email && phoneNumber && !hasExactMatch && (hasEmailMatch || hasPhoneMatch)) {
      await ContactModel.create({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary'
      });
      
      // Refresh secondary contacts list
      const updatedSecondaries = await ContactModel.findSecondariesByPrimaryId(primaryContact.id);
      secondaryContacts.length = 0;
      secondaryContacts.push(...updatedSecondaries);
    }
    
    // Collect all unique emails and phone numbers
    const emails = new Set();
    const phoneNumbers = new Set();
    const secondaryContactIds = [];
    
    if (primaryContact.email) emails.add(primaryContact.email);
    if (primaryContact.phoneNumber) phoneNumbers.add(primaryContact.phoneNumber);
    
    for (const contact of secondaryContacts) {
      if (contact.email) emails.add(contact.email);
      if (contact.phoneNumber) phoneNumbers.add(contact.phoneNumber);
      secondaryContactIds.push(contact.id);
    }
    
    // Return the consolidated contact information
    return {
      contact: {
        primaryContactId: primaryContact.id,
        emails: [...emails],
        phoneNumbers: [...phoneNumbers],
        secondaryContactIds
      }
    };
  }
};