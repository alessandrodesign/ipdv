import { Router } from "express";
import { CargoController } from "../controller/CargoController";
import { Cargo } from "../entity/Cargo";

export const routerCargo = Router();
const cargoCtrl = new CargoController;

//Adiciona cargo
routerCargo.post('/', async (req, res) => {
    const { nome } = req.body;
    const cargo = new Cargo(nome);
    const cargoSalvo = await cargoCtrl.salvar(cargo);
    res.json(cargoSalvo);
});
//Atualiza cargo
routerCargo.put('/', async (req, res) => {   
    const { id, nome } = req.body;
    const departamento = await cargoCtrl.update(id, nome);
    res.json(departamento);
});
//Seleciona cargo
routerCargo.get('/:id', async (req, res) => {
    const usuario = await cargoCtrl.get(parseInt(req.params.id));
    res.json(usuario);
});
//Lista todos os cargos
routerCargo.get('/', async (req, res) => {
    const cargos = await cargoCtrl.cargos();
    res.json(cargos);
});
//Deleta usuario
routerCargo.delete('/:id', async (req, res) => {
    const usuarios = await cargoCtrl.delete(parseInt(req.params.id));
    res.json(usuarios);
});