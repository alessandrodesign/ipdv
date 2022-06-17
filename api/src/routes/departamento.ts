import { Router } from "express";
import { DepartamentoController } from "../controller/DepartamentoController";
import { UsuarioController } from "../controller/UsuarioController";
import { Departamento } from "../entity/Departamento";
import { UsuarioDepartamento } from "../entity/UsuarioDepartamento";

export const routerDepartamento = Router();
const departamentoCtrl = new DepartamentoController();

//Adiciona usuario a departamento
routerDepartamento.post('/add-usuario', async (req, res) => {
    const { departamentoId, usuarioId } = req.body;
    const usuarioCtrl = new UsuarioController();
    const usuario = await usuarioCtrl.get(parseInt(usuarioId));
    const departamento = await departamentoCtrl.get(parseInt(departamentoId));
    if (usuario === null) {
        res.status(404).json({ error: 'Usuário não encontrado' });
    } else if (departamento === null) {
        res.status(404).json({ error: 'Departamento não encontrado' });
    } else {
        const usuarioDepartamentoSalvo = await departamentoCtrl.merge(new UsuarioDepartamento(usuario, departamento));
        res.json(usuarioDepartamentoSalvo);
    }
});

//Adiciona departamento
routerDepartamento.post('/', async (req, res) => {
    const { nome } = req.body;
    const departamento = new Departamento(nome);
    const departamentoSalvo = await departamentoCtrl.salvar(departamento);
    res.json(departamentoSalvo);
});
//Atualiza departamento
routerDepartamento.put('/', async (req, res) => {   
    const { id, nome } = req.body;
    const departamento = await departamentoCtrl.update(id, nome);
    res.json(departamento);
});
//Listar usuários
routerDepartamento.get('/:id/usuarios', async (req, res) => {
    const usuarios = await departamentoCtrl.getUsers(parseInt(req.params.id));
    res.json(usuarios);
});
//Seleciona departamento
routerDepartamento.get('/:id', async (req, res) => {
    const departamento = await departamentoCtrl.get(parseInt(req.params.id));
    res.json(departamento);
});
//Lista todos os departamentos
routerDepartamento.get('/', async (req, res) => {
    const departamentos = await departamentoCtrl.departamentos();
    res.json(departamentos);
});
//Deleta departamento
routerDepartamento.delete('/:id', async (req, res) => {
    const departamentos = await departamentoCtrl.delete(parseInt(req.params.id));
    res.json(departamentos);
});