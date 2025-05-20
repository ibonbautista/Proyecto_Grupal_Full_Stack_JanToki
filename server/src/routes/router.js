import { Router } from "express";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import { isAdmin } from '../middlewares/isAdmin.js';
import authRouter from "./authRouter.js";
import favoriteRouter from "./favoriteRouter.js";
import reviewRouter from "./reviewRouter.js";
import restaurantRouter from "./restaurantRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

// router.use("/api",apiRouter);
// router.use("/",viewRouter);

router.get("/",(req,res)=>{
    res.send("hola jantokiiiii")
})

router.use("/",authRouter);
router.use("/favorite", isLoggedInAPI, favoriteRouter);
router.use("/review", reviewRouter);
router.use("/restaurant",restaurantRouter);
router.use("/user", isLoggedInAPI, isAdmin, userRouter);

export default router