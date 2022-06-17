import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { UsuarioCargo } from "./UsuarioCargo";
import { UsuarioDepartamento } from "./UsuarioDepartamento";

@Entity()
export class Usuario {

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToMany(() => UsuarioCargo, (usuarioCargo) => usuarioCargo.usuario, {
        onDelete: 'CASCADE'
    })
    cargo: UsuarioCargo[]

    @OneToMany(() => UsuarioDepartamento, (usuarioDepartamento) => usuarioDepartamento.usuario, {
        onDelete: 'CASCADE'
    })
    departamento: UsuarioDepartamento[]
}
