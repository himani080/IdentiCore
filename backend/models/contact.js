import { getDb, isUsingSqlite } from '../database.js';

export const ContactModel = {
  // Find contact by email or phone
  findByEmailOrPhone: async (email, phoneNumber) => {
    const db = getDb();
    
    if (isUsingSqlite()) {
      const stmt = db.prepare(`
        SELECT * FROM contacts
        WHERE (email = ? OR phoneNumber = ?)
        AND deletedAt IS NULL
      `);
      return stmt.all(email, phoneNumber);
    } else {
      const [rows] = await db.query(`
        SELECT * FROM contacts
        WHERE (email = ? OR phoneNumber = ?)
        AND deletedAt IS NULL
      `, [email, phoneNumber]);
      return rows;
    }
  },

  // Find primary contact by id
  findPrimaryById: async (id) => {
    const db = getDb();
    
    if (isUsingSqlite()) {
      const stmt = db.prepare(`
        SELECT * FROM contacts
        WHERE id = ?
        AND linkPrecedence = 'primary'
        AND deletedAt IS NULL
      `);
      return stmt.get(id);
    } else {
      const [rows] = await db.query(`
        SELECT * FROM contacts
        WHERE id = ?
        AND linkPrecedence = 'primary'
        AND deletedAt IS NULL
      `, [id]);
      return rows[0];
    }
  },

  // Find all secondary contacts for a primary contact
  findSecondariesByPrimaryId: async (primaryId) => {
    const db = getDb();
    
    if (isUsingSqlite()) {
      const stmt = db.prepare(`
        SELECT * FROM contacts
        WHERE linkedId = ?
        AND linkPrecedence = 'secondary'
        AND deletedAt IS NULL
        ORDER BY createdAt ASC
      `);
      return stmt.all(primaryId);
    } else {
      const [rows] = await db.query(`
        SELECT * FROM contacts
        WHERE linkedId = ?
        AND linkPrecedence = 'secondary'
        AND deletedAt IS NULL
        ORDER BY createdAt ASC
      `, [primaryId]);
      return rows;
    }
  },

  // Create a new contact
  create: async (contact) => {
    const db = getDb();
    
    if (isUsingSqlite()) {
      const stmt = db.prepare(`
        INSERT INTO contacts (
          phoneNumber, email, linkedId, linkPrecedence
        ) VALUES (?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        contact.phoneNumber || null,
        contact.email || null,
        contact.linkedId || null,
        contact.linkPrecedence
      );
      
      return result.lastInsertRowid;
    } else {
      const [result] = await db.query(`
        INSERT INTO contacts (
          phoneNumber, email, linkedId, linkPrecedence
        ) VALUES (?, ?, ?, ?)
      `, [
        contact.phoneNumber || null,
        contact.email || null,
        contact.linkedId || null,
        contact.linkPrecedence
      ]);
      
      return result.insertId;
    }
  },

  // Update a contact to be secondary and link to a primary
  updateToSecondary: async (id, primaryId) => {
    const db = getDb();
    
    if (isUsingSqlite()) {
      const stmt = db.prepare(`
        UPDATE contacts
        SET linkedId = ?, linkPrecedence = 'secondary', updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      
      return stmt.run(primaryId, id);
    } else {
      return await db.query(`
        UPDATE contacts
        SET linkedId = ?, linkPrecedence = 'secondary', updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [primaryId, id]);
    }
  }
};