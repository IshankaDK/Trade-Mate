import { Router } from "express";
import { saveTrade,getAllTradesByUser } from "../controller/trade.controller";

const router = Router();

// post
router.post("/", saveTrade);

// get all
router.get("/user", getAllTradesByUser);

// delete


export default router;