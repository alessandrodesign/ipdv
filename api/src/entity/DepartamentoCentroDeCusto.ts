import { Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { CentroDeCusto } from "./CentroDeCusto";
import { Departamento } from "./Departamento";

@Entity()
export class DepartamentoCentroDeCusto {

    constructor(centroDeCusto: CentroDeCusto, departamento: Departamento) {
        this.centroDeCusto = centroDeCusto;
        this.departamento = departamento;
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => CentroDeCusto, {
        onDelete: 'CASCADE'
    })
    centroDeCusto: CentroDeCusto

    @ManyToOne(() => Departamento, {
        onDelete: 'CASCADE'
    })
    departamento: Departamento

}
