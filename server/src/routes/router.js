import { Router } from "express";
import authRouter from "./authRouter.js";
const router = Router();

// router.use("/api",apiRouter);

// router.use("/",viewRouter);

router.get("/",(req,res)=>{
    res.send("hola jantoki")
})

router.use("/",authRouter);

export default router