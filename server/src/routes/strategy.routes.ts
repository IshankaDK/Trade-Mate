import { Router } from "express";
import {
    createStrategy,
    getAllStrategiesByUser,
    getStrategyById,
    updateStrategyById,
    deleteStrategyById,
} from "../controller/strategy.controller";

const router = Router();

// Create a new strategy
router.post("/", createStrategy);

// Get all strategies by userId
router.get("/user", getAllStrategiesByUser);

// Get a single strategy by ID
router.get("/:id", getStrategyById);

// Update a strategy by ID
router.put("/:id", updateStrategyById);

// Delete a strategy by ID
router.delete("/:id", deleteStrategyById);

export default router;