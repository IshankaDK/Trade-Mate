import {Router} from "express";
import {
    deleteCurrencyPairById,
    getCurrencyPairsById,
    getCurrencyPairsByUser,
    saveCurrencyPair,
} from "../controller/currency.controller";

const router = Router();

router.post("", saveCurrencyPair);
router.get("/:id", getCurrencyPairsById);
router.get("/user/:userId", getCurrencyPairsByUser);
router.delete("/:id", deleteCurrencyPairById);

export default router;

