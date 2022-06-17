import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Departamento } from "./Departamento";

@Entity()
export class UsuarioDepartamento {

    constructor(usuario: Usuario, departamento: Departamento) {
        this.usuario = usuario;
        this.departamento = departamento;
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Usuario, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario

    @ManyToOne(() => Departamento, {
        onDelete: 'CASCADE'
    })
    departamento: Departamento

}
