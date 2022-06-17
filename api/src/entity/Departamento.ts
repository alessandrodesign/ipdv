import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Departamento {

    constructor(nome: string) {
        this.nome = nome;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

}
