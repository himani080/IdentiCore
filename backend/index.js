import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { setupDatabase } from './database.js';
import { identifyRouter } from './routes/identify.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Setup database
setupDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/identify', identifyRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});