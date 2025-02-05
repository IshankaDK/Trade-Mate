import { Router } from "express";
import {
  deleteTradeById,
  getAllTradesByUser,
  getUserEquityCurve,
  getUserTradeStats,
  saveTrade,
} from "../controller/trade.controller";

const router = Router();

// post
router.post("/", saveTrade);

// get all
router.get("/user", getAllTradesByUser);

// delete
router.delete("/:id", deleteTradeById);

// stats
router.get("/users/trade-stats", getUserTradeStats);
router.get("/users/trade-stats/equity", getUserEquityCurve);

export default router;
