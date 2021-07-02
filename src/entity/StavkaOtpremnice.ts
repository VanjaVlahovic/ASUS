import {Entity, Column, ManyToOne, PrimaryColumn, JoinColumn} from "typeorm";
import { Otpremnica } from "./Otpremnica";
import { Proizvod } from "./Proizvod";

@Entity()
export class StavkaOtpremnice {

    @PrimaryColumn()
    rBrStavkeOtp: number;

    @PrimaryColumn()
    sifraOtpremnice: number

    @Column()
    opis: string;

    @Column()
    kolicina: number;

    @Column()
    sifraPorudzbenice: number;

    @ManyToOne(type => Proizvod, proizvod => proizvod.stavkeOtpremnice, {eager: true})
    proizvod: Proizvod;

    @ManyToOne(type => Otpremnica, otpremnica => otpremnica.stavkeOtpremnice, { onDelete: 'CASCADE' })
    @JoinColumn({name : 'sifraOtpremnice', referencedColumnName: 'sifraOtpremnice'})
    otpremnica: Otpremnica;

}
