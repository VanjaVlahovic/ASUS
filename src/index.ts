import "reflect-metadata";
import {createConnection} from "typeorm";
import * as bodyParser from "body-parser";
import PrevoznoSredstvoRoutes from "./routes/PrevoznoSredstvoRoutes";
import cors = require("cors");
import express = require("express");
import OtpremnicaRoutes from "./routes/OtpremnicaRoutes";
import RadnikRoutes from "./routes/RadnikRoutes";
import ProizvodRoutes from "./routes/ProizvodRoutes";
import StavkaOtpremniceRoutes from "./routes/StavkaOtpremniceRoutes";

createConnection().then(connection => {
    
    
    // create express app
    const app = express();
    // set middlewares
    app.use(bodyParser.json());
    app.use(cors());

    // add routers
    app.use("/prevoznosredstvo", PrevoznoSredstvoRoutes);
    app.use("/otpremnica", OtpremnicaRoutes);
    app.use("/radnik", RadnikRoutes);
    app.use("/proizvod", ProizvodRoutes);
    app.use("/stavkaotpremnice", StavkaOtpremniceRoutes);
    
    // start express server
    app.listen(3001, () => console.log("Listening on 3001..."));

}).catch(error => console.log(error));
