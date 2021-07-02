import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { StavkaOtpremnice } from "./StavkaOtpremnice";

@Entity()
export class Proizvod {

    @PrimaryGeneratedColumn()
    sifraProizvoda: number;

    @Column()
    nazivModela: string;

    @OneToMany(type => StavkaOtpremnice, stavkaOtpremnice => stavkaOtpremnice.proizvod)
    stavkeOtpremnice: StavkaOtpremnice[];
}