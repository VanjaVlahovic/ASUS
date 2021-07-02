import { StavkaOtpremnice } from "./StavkaOtpremnice";

export class Otpremnica {

    sifraOtpremnice: number;
    datum: string;
    radnik: number;
    stavkeOtpremnice: StavkaOtpremnice[];

    constructor(sifraOtpremnice: number, datum: string, radnik: number, stavke: StavkaOtpremnice[]) {
        this.sifraOtpremnice = sifraOtpremnice;
        this.datum = datum;
        this.radnik = radnik;
        this.stavkeOtpremnice = stavke;
    }
}