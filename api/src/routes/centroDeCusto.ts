import { Router } from "express";
import { CentroDeCustoController } from "../controller/CentroDeCustoController";
import { DepartamentoController } from "../controller/DepartamentoController";
import { CentroDeCusto } from "../entity/CentroDeCusto";
import { DepartamentoCentroDeCusto } from "../entity/DepartamentoCentroDeCusto";

export const routerCentroDeCusto = Router();
const centroCtrl = new CentroDeCustoController();

//Adiciona departamento a centro de custo
routerCentroDeCusto.post('/add-departamento', async (req, res) => {
    const { departamentoId, centroDeCustoId } = req.body;
    const departamentoCtrl = new DepartamentoController();
    const departamento = await departamentoCtrl.get(parseInt(departamentoId));
    const centro_de_custo = await centroCtrl.get(parseInt(centroDeCustoId));
    if (centro_de_custo === null) {
        res.status(404).json({ error: 'Centro de custo não encontrado' });
    } else if (departamento === null) {
        res.status(404).json({ error: 'Departamento não encontrado' });
    } else {
        const departamentoCentroDeCustoSalvo = await centroCtrl.merge(new DepartamentoCentroDeCusto(centro_de_custo, departamento));
        res.json(departamentoCentroDeCustoSalvo);
    }
});

//Adiciona centro de custo
routerCentroDeCusto.post('/', async (req, res) => {
    const { nome } = req.body;
    const centro = new CentroDeCusto(nome);
    const centroSalvo = await centroCtrl.salvar(centro);
    res.json(centroSalvo);
});

//Atualiza departamento
routerCentroDeCusto.put('/', async (req, res) => {   
    const { id, nome } = req.body;
    const centro = await centroCtrl.update(id, nome);
    res.json(centro);
});

//Listar departamentos
routerCentroDeCusto.get('/:id/departamentos', async (req, res) => {
    const usuarios = await centroCtrl.getDepartments(parseInt(req.params.id));
    res.json(usuarios);
});

//Seleciona centro de custo
routerCentroDeCusto.get('/:id', async (req, res) => {
    const usuario = await centroCtrl.get(parseInt(req.params.id));
    res.json(usuario);
});

//Lista todos os centros de custo
routerCentroDeCusto.get('/', async (req, res) => {
    const centros = await centroCtrl.centros();
    res.json(centros);
});

//Deleta centro de custo
routerCentroDeCusto.delete('/:id', async (req, res) => {
    const usuarios = await centroCtrl.delete(parseInt(req.params.id));
    res.json(usuarios);
});