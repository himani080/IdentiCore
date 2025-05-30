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

};