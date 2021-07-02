import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()
export class PrevoznoSredstvo {

    @PrimaryGeneratedColumn()
    sifraSredstva: number;

    @Column()
    nazivSredstva: string;
}