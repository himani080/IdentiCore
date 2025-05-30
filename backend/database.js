import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'identity_reconciliation'
};

let pool;
let sqliteDb;

export async function setupDatabase() {
  try {
    // Create connection pool
    pool = mysql.createPool(dbConfig);
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('MySQL connection successful');

    // Create tables if they don't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phoneNumber VARCHAR(20),
        email VARCHAR(255),
        linkedId INT,
        linkPrecedence ENUM('primary', 'secondary'),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL
      )
    `);

    console.log('MySQL database setup complete');
    connection.release();
    return pool;
  } catch (error) {
    console.error('MySQL setup error:', error);
    
    console.log('Setting up SQLite fallback database...');
    return setupSqliteDatabase();
  }
}

async function setupSqliteDatabase() {
  try {
    const Database = (await import('better-sqlite3')).default;
    const dbPath = path.join(__dirname, 'contacts.db');
    sqliteDb = new Database(dbPath);
    
    // Create tables
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phoneNumber TEXT,
        email TEXT,
        linkedId INTEGER,
        linkPrecedence TEXT CHECK(linkPrecedence IN ('primary', 'secondary')),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        deletedAt DATETIME
      )
    `);
    
    console.log('SQLite fallback database setup complete');
    return sqliteDb;
  } catch (err) {
    console.error('Failed to setup SQLite database:', err);
    throw err;
  }
}

export function getDb() {
  return pool || sqliteDb;
}

export function isUsingSqlite() {
  return !pool && sqliteDb;
}