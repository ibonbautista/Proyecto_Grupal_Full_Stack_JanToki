import { Router } from "express";
import authRouter from "./authRouter.js";
import favoriteRouter from "./favoriteRouter.js";
import reviewRouter from "./reviewRouter.js";

const router = Router();

// router.use("/api",apiRouter);

// router.use("/",viewRouter);

router.get("/",(req,res)=>{
    res.send("hola jantokiiiii")
})

router.use("/",authRouter);
router.use("/favorite", favoriteRouter);
router.use("/review", reviewRouter);

export default router