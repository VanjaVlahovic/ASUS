import { Proizvod } from "./Proizvod";

export class StavkaOtpremnice {

    rBrStavkeOtp: number;
    sifraOtpremnice: number;
    opis: string;
    kolicina: number;
    proizvod: Proizvod;
    sifraPorudzbenice: number;
    status: string = "Stari";

    constructor(rBrStavkeOtp: number, sifraOtpremnice: number, opis: string, kolicina: number, proizvod: Proizvod, sifraPorudzbenice: number) {
        this.rBrStavkeOtp = rBrStavkeOtp;
        this.sifraOtpremnice = sifraOtpremnice;
        this.opis = opis;
        this.kolicina = kolicina;
        this.proizvod = proizvod;
        this.sifraPorudzbenice = sifraPorudzbenice;
    }
}