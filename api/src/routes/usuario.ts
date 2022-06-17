import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { CargoController } from "../controller/CargoController";
import { Usuario } from "../entity/Usuario";
import { UsuarioCargo } from "../entity/UsuarioCargo";
import { sign, verify } from 'jsonwebtoken';
import { AppDataSource } from "../data-source";
import { StoreToken } from "../entity/StoreToken";
import { MoreThanOrEqual } from "typeorm";
import { DepartamentoController } from "../controller/DepartamentoController";
import { UsuarioDepartamento } from "../entity/UsuarioDepartamento";

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioController();
//Usuario logout
routerUsuario.get('/logout', async (req, res) => {
    const refreshToekn = req.cookies['refreshToekn'];
    await AppDataSource.getRepository(StoreToken).delete({ token: refreshToekn });
    res.cookie('refreshToken', '', { maxAge: 0 });

    res.send({
        success: true
    });
});
//Usuario logado
routerUsuario.get('/isLogged', async (req, res) => {
    try {
        const accessToken = req.query.token ? req.query.token.toLocaleString() : (req.header('Authorization')?.split(' ')[1] || "");
        const payload: any = verify(accessToken, 'access_secret');
        if (!payload) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }
        const usuario = await usuarioCtrl.get(parseInt(payload.id));
        if (!usuario) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }
        const { senha, ...data } = usuario;
        res.send(data);
    } catch (e) {
        return res.status(401).send({
            error: 'Não autenticado'
        });
    }
});
//Atualiza token
routerUsuario.post('/refresh', async (req, res) => {
    try {
        const refreshToekn = req.cookies['refreshToekn'];
        const payload: any = verify(refreshToekn, 'refresh_secret');
        if (!payload) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }

        const dbToken = await AppDataSource.getRepository(StoreToken).findOneBy({
            usuarioId: payload.id,
            expired_at: MoreThanOrEqual(new Date())
        });

        if (!dbToken) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }

        const accessToken = sign({
            id: payload.id
        }, 'access_secret', {
            expiresIn: '30s'
        });

        res.send({
            accessToken
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Não autenticado'
        });
    }
});
//Login do usuário
routerUsuario.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const response = await usuarioCtrl.login(email, senha);

    if (!response.error) {
        res.cookie('refreshToken', response.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        });
    }

    res.json(response.error ? response.error : { token: response.accessToken });
});
//Adiciona usuario a carho
routerUsuario.post('/add-cargo', async (req, res) => {
    const { cargoId, usuarioId } = req.body;
    const cargoCtrl = new CargoController();
    const usuario = await usuarioCtrl.get(parseInt(usuarioId));
    const cargo = await cargoCtrl.get(parseInt(cargoId));
    if (usuario === null) {
        res.status(404).json({ error: 'Usuário não encontrado' });
    } else if (cargo === null) {
        res.status(404).json({ error: 'Cargo não encontrado' });
    } else {
        const usuarioCargoSalvo = await usuarioCtrl.merge(new UsuarioCargo(usuario, cargo));
        res.json(usuarioCargoSalvo);
    }
});

//Adiciona usuario
routerUsuario.post('/', async (req, res) => {
    const { nome, email, senha, cargo, departamento } = req.body;
    const usuario = new Usuario(nome, email, senha);
    const usuarioSalvo = await usuarioCtrl.salvar(usuario);

    const cargoCtrl = new CargoController();
    const cargoGet = await cargoCtrl.get(parseInt(cargo));
    const usuarioCargoSalvo = await usuarioCtrl.merge(new UsuarioCargo(usuarioSalvo, cargoGet));

    const departamentoCtrl = new DepartamentoController();
    const departamentoGet = await departamentoCtrl.get(parseInt(departamento));
    const usuarioDepartamentoSalvo = await usuarioCtrl.mergeDepartamento(new UsuarioDepartamento(usuarioSalvo, departamentoGet));

    const inner = {
        departamento: usuarioDepartamentoSalvo,
        cargo: usuarioCargoSalvo
    };
    const userSaved = { ...inner, ...usuarioSalvo };
    res.json(userSaved);
});
//Atualiza usuario
routerUsuario.put('/', async (req, res) => {
    const { id, nome, email, senha } = req.body;
    const usuario = await usuarioCtrl.update(id, nome, email, senha);
    res.json(usuario);
});
//Seleciona usuario
routerUsuario.get('/:id', async (req, res) => {
    const usuario = await usuarioCtrl.get(parseInt(req.params.id));
    res.json(usuario);
});
//Lista todos os usuários
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.usuarios();
    res.json(usuarios);
});
//Deleta usuario
routerUsuario.delete('/:id', async (req, res) => {
    const usuarios = await usuarioCtrl.delete(parseInt(req.params.id));
    res.json(usuarios);
});