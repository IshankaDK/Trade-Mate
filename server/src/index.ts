import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRoutes from "./routes/auth";
import cors from "cors";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // allow cors

mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .then((connection) => {
    connection
      .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
      .then(() => {
        console.log(`Database ${process.env.DB_NAME} created successfully.`);
        connection.end();
      })
      .catch((err) => {
        console.error("Database creation failed:", err);
        connection.end();
      })
      .then(() => {
        sequelize
          .sync({ alter: true })
          .then(() => {
            console.log("Database connected successfully.");
            app.listen(PORT, () => {
              console.log(`Server is running on port ${PORT}`);
            });
          })
          .catch((err) => console.error("Database sync failed:", err));
      });
  });

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ROUTES
app.use("/api/auth", authRoutes);
