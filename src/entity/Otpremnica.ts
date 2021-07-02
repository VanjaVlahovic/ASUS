import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable} from "typeorm";
import { Radnik } from "./Radnik";
import { StavkaOtpremnice } from "./StavkaOtpremnice";

@Entity()
export class Otpremnica {

    @PrimaryGeneratedColumn()
    sifraOtpremnice: number;

    @Column()
    datum: Date;

    @ManyToOne(type => Radnik, radnik => radnik.otpremnice, {eager: true})
    radnik: Radnik;

    @OneToMany(type => StavkaOtpremnice, stavkaOtpremnice => stavkaOtpremnice.otpremnica, {eager: true})
    stavkeOtpremnice: StavkaOtpremnice[];

}
