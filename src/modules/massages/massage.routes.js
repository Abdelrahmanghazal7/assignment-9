import { Router } from "express";
import * as massage from "./massage.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/", auth, massage.addMassage);

router.get("/", massage.getMassages);

router.delete("/:id", auth, massage.deleteMassage);

export default router;
