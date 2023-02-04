import { Router } from "express";
import addRouter from "./add";
import deleteRouter from "./delete";
import editRouter from "./edit";
import infoRouter from "./info";


const router = Router();

router.use("/edit", editRouter);
router.use("/add", addRouter);
router.use("/delete", deleteRouter);
router.use("/info", infoRouter)

export default router;
