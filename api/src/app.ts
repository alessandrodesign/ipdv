import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import { AppDataSource } from "./data-source";
import { routerUsuario } from './routes/usuario';
import { routerCargo } from './routes/cargo';
import { routerDepartamento } from './routes/departamento';
import { routerCentroDeCusto } from './routes/centroDeCusto';

export const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger('dev'));

AppDataSource.initialize()
    .then(() => {
        console.log("O banco de dados foi inicializado!")
    })
    .catch((err) => {
        console.error("Erro durante a inicialização do banco de dados", err)
    });

app.use('/usuario', routerUsuario);
app.use('/cargo', routerCargo);
app.use('/departamento', routerDepartamento);
app.use('/centro-de-custo', routerCentroDeCusto);
app.use('/', (req, res) => res.send('API'));