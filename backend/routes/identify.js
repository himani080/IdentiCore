import express from 'express';
import { IdentityService } from '../services/identityService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    
    // Validate request
    if (!email && !phoneNumber) {
      return res.status(400).json({ 
        error: 'At least one of email or phoneNumber is required' 
      });
    }
    
    // Process the identification request
    const result = await IdentityService.identify(email, phoneNumber);
    
    // Return the result
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in identify route:', error);
    res.status(500).json({ 
      error: 'An error occurred during identification',
      message: error.message 
    });
  }
});

// Get all contacts (for admin purposes)
router.get('/contacts', async (req, res) => {
  try {
    const { ContactModel } = await import('../models/contact.js');
    const db = await import('../database.js');
    const pool = db.getDb();
    
    // For MySQL
    if (pool) {
      const [rows] = await pool.query(`
        SELECT * FROM contacts 
        WHERE deletedAt IS NULL
        ORDER BY createdAt DESC
      `);
      return res.status(200).json(rows);
    } 
    // For SQLite fallback
    else if (global.db) {
      const stmt = global.db.prepare(`
        SELECT * FROM contacts 
        WHERE deletedAt IS NULL
        ORDER BY createdAt DESC
      `);
      const rows = stmt.all();
      return res.status(200).json(rows);
    }
    
    return res.status(500).json({ error: 'Database not initialized' });
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ 
      error: 'An error occurred while retrieving contacts',
      message: error.message 
    });
  }
});

export const identifyRouter = router;