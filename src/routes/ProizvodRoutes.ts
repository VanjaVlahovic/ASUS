import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Proizvod } from "../entity/Proizvod";

const router = Router();

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(await getRepository(Proizvod).find());
    } catch(e) {
        res.json({error: e.message});
    }
});

export default router;