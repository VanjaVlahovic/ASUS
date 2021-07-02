import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Otpremnica } from "./Otpremnica";

@Entity()
export class Radnik {

    @PrimaryGeneratedColumn()
    sifraRadnika: number;

    @Column()
    imePrezime: string;

    @OneToMany(type => Otpremnica, otpremnica => otpremnica.radnik)
    otpremnice: Otpremnica[];
}