import { Router } from "express";
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
router.use("/favorite", favoriteRouter);
router.use("/review", reviewRouter);
router.use("/restaurant",restaurantRouter);
router.use("/user",userRouter);

export default router