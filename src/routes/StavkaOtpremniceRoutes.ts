import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { StavkaOtpremnice } from "../entity/StavkaOtpremnice";

const router = Router();

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        let stavke = await getRepository(StavkaOtpremnice).find();
        res.json(stavke);
    } catch(e) {
        res.json({error: e.message});
    }
});

//delete by id
router.delete("/:sifraOtpremnice/:rBrStavkeOtp", async (req: Request, res: Response) => {
    try{
        let sO = Number(req.params.sifraOtpremnice);
        let rBr = Number(req.params.rBrStavkeOtp);
        let stavka = await getRepository(StavkaOtpremnice).find({where: { sifraOtpremnice: sO, rBrStavkeOtp: rBr} });
        
        if(stavka!==[]){
            await getRepository(StavkaOtpremnice).delete({ sifraOtpremnice: sO, rBrStavkeOtp: rBr});
            res.sendStatus(200);
        }else {
            res.json({error: `Stavka sifra otpremnice: ${sO} redni broj stavke: ${rBr} ne postoji.`});
        }
    } catch(e) {
        res.json({error: e.message});
    }
});

//insert one
router.post("/", async (req: Request, res: Response) => {
    try{
        let result = await getRepository(StavkaOtpremnice).insert({...req.body});
        let sO = result.identifiers[0].sifraOtpremnice;
        let rBr = result.identifiers[0].rBrStavkeOtp;
        let stavka = await getRepository(StavkaOtpremnice).find({where: { sifraOtpremnice: sO, rBrStavkeOtp: rBr} });
        res.json(stavka[0]);
    } catch(e) {
        res.json({error: e.message});
    }
});

//update one
router.patch("/:sifraOtpremnice/:rBrStavkeOtp", async (req: Request, res: Response) => {
    try{
        let sO = Number(req.params.sifraOtpremnice);
        let rBr = Number(req.params.rBrStavkeOtp);
        await getRepository(StavkaOtpremnice).update({ sifraOtpremnice: sO, rBrStavkeOtp: rBr}, req.body);
        let stavka = await getRepository(StavkaOtpremnice).find({where: { sifraOtpremnice: sO, rBrStavkeOtp: rBr} });
        if(stavka[0]){
            res.json(stavka[0]);
        }else{
            res.json({error: `Stavka sifra otpremnice: ${sO} redni broj stavke: ${rBr} ne postoji.`});
        }
    } catch(e) {
        res.json({error: e.message});
    }
});

export default router;