import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import authRoutes from './routes/auth';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors()); // allow cors

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected successfully.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Database connection failed:', err));


// TEST ROUTE
app.get('/', (req, res) => {
    res.send("Server is running");
});

// ROUTES
app.use('/api/auth', authRoutes);
