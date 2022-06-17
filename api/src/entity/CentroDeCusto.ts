import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class CentroDeCusto {

    constructor(nome: string) {
        this.nome = nome;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

}
