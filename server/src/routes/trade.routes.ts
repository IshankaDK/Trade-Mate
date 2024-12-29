import { Router } from "express";
import { saveTrade, getAllTradesByUser, getUserTradeStats, getUserEquityCurve, getUserAverageHoldingPeriod } from "../controller/trade.controller";

const router = Router();

// post
router.post("/", saveTrade);

// get all
router.get("/user", getAllTradesByUser);

// delete

// stats
router.get("/users/trade-stats", getUserTradeStats);
router.get("/users/trade-stats/equity", getUserEquityCurve);
router.get("/users/trade-stats/avg-holding", getUserAverageHoldingPeriod);



export default router;