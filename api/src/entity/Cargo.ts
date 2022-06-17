import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cargo {

    constructor(nome: string) {
        this.nome = nome;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

}
