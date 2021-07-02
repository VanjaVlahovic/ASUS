import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { PrevoznoSredstvo } from "../entity/PrevoznoSredstvo";

const router = Router();

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(await getRepository(PrevoznoSredstvo).find());
    } catch(e) {
        res.json({error: e.message});
    }
});

//get by id
router.get("/:id", async (req: Request, res: Response) => {
    try{
        let prevoznosredstvo = await getRepository(PrevoznoSredstvo).findOne(req.params.id);
        if(prevoznosredstvo){
            res.json(prevoznosredstvo);
        }else {
            res.json({error: `Prevozno sredstvo id ${req.params.id} ne postoji.`});
        }
    } catch (e) {
        res.json({error: e.message});
    }
});

//delete by id
router.delete("/:id", async (req: Request, res: Response) => {
    try{
        let prevoznosredstvo = await getRepository(PrevoznoSredstvo).findOne(req.params.id);
        if(prevoznosredstvo){
            await getRepository(PrevoznoSredstvo).delete(req.params.id);
            res.sendStatus(200);
        }else {
            res.json({error: `Prevozno sredstvo id ${req.params.id} ne postoji.`});
        }
    } catch(e) {
        res.json({error: e.message});
    }
});

//insert one
router.post("/", async (req: Request, res: Response) => {
    try{
        let result = await getRepository(PrevoznoSredstvo).insert({...req.body});
        res.json(await getRepository(PrevoznoSredstvo).findOne(result.identifiers[0].sifraSredstva));
    } catch(e) {
        res.json({error: e.message});
    }
});

//update one
router.patch("/:id", async (req: Request, res: Response) => {
    try{
        await getRepository(PrevoznoSredstvo).update(req.params.id, req.body);
        let prevoznoSredstvo = await getRepository(PrevoznoSredstvo).findOne(req.params.id)
        if(prevoznoSredstvo){
            res.json(prevoznoSredstvo);
        }else{
            res.json({error: `Prevozno sredstvo id ${req.params.id} ne postoji.`});
        }
    } catch(e) {
        res.json({error: e.message});
    }
});
export default router;