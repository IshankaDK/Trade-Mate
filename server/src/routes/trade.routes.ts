import { Router } from "express";
import {
  saveTrade,
  getAllTradesByUser,
  getUserTradeStats,
  getUserEquityCurve,
} from "../controller/trade.controller";

const router = Router();

// post
router.post("/", saveTrade);

// get all
router.get("/user", getAllTradesByUser);

// delete

// stats
router.get("/users/trade-stats", getUserTradeStats);
router.get("/users/trade-stats/equity", getUserEquityCurve);

export default router;
