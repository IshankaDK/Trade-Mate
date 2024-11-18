import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected successfully.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Database connection failed:', err));
