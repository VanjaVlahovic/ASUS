import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Otpremnica } from "../entity/Otpremnica";
import { Radnik } from "../entity/Radnik";
import {getConnection} from "typeorm";
import { StavkaOtpremnice } from "../entity/StavkaOtpremnice";

const router = Router();
const baseUrl = "http://localhost:3001";


//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        let otpremnice = await getRepository(Otpremnica).find();
        res.json(otpremnice);
    } catch(e) {
        res.json({error: e.message});
    }
});

//get by id
router.get("/:id", async (req: Request, res: Response) => {
    try{
        let otpremnica = await getRepository(Otpremnica).findOne(req.params.id);
        if(otpremnica){
            res.json(otpremnica);
        }else {
            res.json({error: `Otpremnica id ${req.params.id} ne postoji.`});
        }
    } catch (e) {
        res.json({error: e.message});
    }
});

//delete by id
router.delete("/:id", async (req: Request, res: Response) => {
    try{
        let otpremnica = await getRepository(Otpremnica).findOne(req.params.id);
        if(otpremnica){
            await getRepository(Otpremnica).delete(req.params.id);
            res.sendStatus(200);
        }else {
            res.json({error: `Otpremnica id ${req.params.id} ne postoji.`});
        }
    } catch(e) {
        res.json({error: e.message});
    }
});

//insert one
router.post("/", async (req: Request, res: Response) => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    
    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
        let radnik = await queryRunner.manager.findOne(Radnik, req.body.radnik);
        if(!radnik) {
            res.json({error: `Radnik id ${req.body.radnik} ne postoji.`});
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return;
        }
        let datum = req.body.datum;
        let radnikO = req.body.radnik;
        let result = await queryRunner.manager.insert(Otpremnica, {'datum':datum, 'radnik':radnikO});
        let sifraOtpremnice = result.identifiers[0].sifraOtpremnice;
        let stavkeOtpremnice = req.body.stavkeOtpremnice;        
        for (let stavka of stavkeOtpremnice){
            stavka.sifraOtpremnice = sifraOtpremnice;
            let { status, ...s } = stavka;
            try{
                await queryRunner.manager.insert(StavkaOtpremnice, {...s});
            } catch(e) {
                throw e;
            }
        }
        let otpremnica = await queryRunner.manager.findOne(Otpremnica, result.identifiers[0].sifraOtpremnice);
        if(otpremnica){
            await queryRunner.commitTransaction();
            res.json(otpremnica);
        }else{
            res.json({error: `Otpremnica id ${sifraOtpremnice} ne postoji.`});
        }    
    } catch (err) {
        res.json({error: `Doslo je do greske. ${err} `});
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
});

//update one
router.patch("/:id", async (req: Request, res: Response) => {    
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    
    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
        let radnik = await queryRunner.manager.findOne(Radnik, req.body.radnik);
        if(!radnik) {
            res.json({error: `Radnik id ${req.body.radnik} ne postoji.`});
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return;
        }
        let sifraOtpremnice = req.params.id;
        let stavkeOtpremnice = req.body.stavkeOtpremnice;
        let datum = req.body.datum;
        let radnikO = req.body.radnik;
        await queryRunner.manager.update(Otpremnica, sifraOtpremnice, {'datum':datum, 'radnik':radnikO});
        
        for (let stavka of stavkeOtpremnice){
        
            let { status, ...s } = stavka;
            if(status==="Nova"){
                try{
                    await queryRunner.manager.insert(StavkaOtpremnice, {...s});
                } catch(e) {
                    throw e;
                }
            }
            if(status==="Izmenjena"){
                try{
                    let {rBrStavkeOtp, sifraOtpremnice, ...ostatak} = s;
                    let sO = Number(sifraOtpremnice);
                    let rBr = Number(rBrStavkeOtp);
                    await queryRunner.manager.update(StavkaOtpremnice, { sifraOtpremnice: sO, rBrStavkeOtp: rBr}, ostatak);
                } catch(e) {
                    throw e;
                }
            }
            if(status==="Obrisana"){
                try{
                    let {rBrStavkeOtp, sifraOtpremnice} = s;
                    let sO = Number(sifraOtpremnice);
                    let rBr = Number(rBrStavkeOtp);
                    let stavka = await queryRunner.manager.find(StavkaOtpremnice, {where: { sifraOtpremnice: sO, rBrStavkeOtp: rBr} });
                    
                    if(stavka!==[]){
                        await queryRunner.manager.delete(StavkaOtpremnice, { sifraOtpremnice: sO, rBrStavkeOtp: rBr});
                    }else {
                        res.json({error: `Stavka sifra otpremnice: ${sO} redni broj stavke: ${rBr} ne postoji.`});
                    }
                } catch(e) {
                    throw e;
                }
            }
        }   
    
        let otpremnica = await queryRunner.manager.findOne(Otpremnica, req.params.id);
        if(otpremnica){
            await queryRunner.commitTransaction();
            res.json(otpremnica);
        }else{
            res.json({error: `Otpremnica id ${req.params.id} ne postoji.`});
        }    
    } catch (err) {
        res.json({error: `Doslo je do greske. ${err} `});
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
});

export default router;
