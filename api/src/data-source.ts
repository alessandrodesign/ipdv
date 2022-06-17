import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cargo } from "./entity/Cargo";
import { CentroDeCusto } from "./entity/CentroDeCusto";
import { Departamento } from "./entity/Departamento";
import { DepartamentoCentroDeCusto } from "./entity/DepartamentoCentroDeCusto";
import { StoreToken } from "./entity/StoreToken";
import { Usuario } from "./entity/Usuario"
import { UsuarioCargo } from "./entity/UsuarioCargo";
import { UsuarioDepartamento } from "./entity/UsuarioDepartamento";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "041216",
    database: "ipdv",
    synchronize: true,
    logging: false,
    entities: [
        Usuario,
        Cargo,
        Departamento,
        CentroDeCusto,
        UsuarioCargo,
        UsuarioDepartamento,
        DepartamentoCentroDeCusto,
        StoreToken
    ],
    migrations: [],
    subscribers: [],
});
