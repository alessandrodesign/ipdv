import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Cargo } from "./Cargo";

@Entity()
export class UsuarioCargo {

    constructor(usuario: Usuario, cargo: Cargo) {
        this.usuario = usuario;
        this.cargo = cargo;
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Usuario, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario

    @ManyToOne(() => Cargo, {
        onDelete: 'CASCADE'
    })
    cargo: Cargo

}
