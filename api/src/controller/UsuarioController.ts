import { Usuario } from "../entity/Usuario";
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UsuarioCargo } from "../entity/UsuarioCargo";

import { AppDataSource } from "../data-source";
import { StoreToken } from "../entity/StoreToken";
import { UsuarioDepartamento } from "../entity/UsuarioDepartamento";

export class UsuarioController {
    private saltOrRounds = 10;
    async login(email: string, senha: string) {
        const repository = AppDataSource.getRepository(Usuario);
        const usuario = await repository.findOneBy({
            email: email
        });
        if (!usuario) {
            return { error: 'Acesso negado' };
        }
        if (!await bcrypt.compare(senha, usuario.senha)) {
            return { error: 'Acesso negado' };
        }

        const refreshToken = sign({
            id: usuario.id
        }, 'refresh_secret', {
            expiresIn: '1w'
        });

        const expired_at = new Date();
        expired_at.setDate(expired_at.getDate() + 7);

        await AppDataSource.getRepository(StoreToken).save({
            usuarioId: usuario.id,
            token: refreshToken,
            expired_at: expired_at
        });

        const accessToken = sign({
            id: usuario.id
        }, 'access_secret', {
            expiresIn: '30s'
        });

        return { accessToken: accessToken, refreshToken: refreshToken };
    }
    async salvar(usuario: Usuario) {
        const hash = bcrypt.hashSync(usuario.senha, this.saltOrRounds);
        usuario.senha = hash;
        return await AppDataSource.manager.save(usuario);
    }
    async usuarios() {
        return await AppDataSource.manager.find(Usuario);
    }
    async get(id: number) {
        const repository = AppDataSource.getRepository(Usuario);
        const usuario = await repository.findOneBy({
            id: id
        });

        const usuarioDepartamento = await AppDataSource.getRepository(UsuarioDepartamento).findOne({
            relations: {
                departamento: true
            },
            where: { usuario: { id: id } },
        });

        const usuarioCargo = await AppDataSource.getRepository(UsuarioCargo).findOne({
            relations: {
                cargo: true
            },
            where: { usuario: { id: id } },
        });
        const inner = {
            departamento: usuarioDepartamento,
            cargo: usuarioCargo
        };
        return { ...inner, ...usuario };
    }
    async update(id: number, nome: string | null, email: string | null, senha: string | null) {
        const usuarioData = { nome: undefined, email: undefined, senha: undefined };
        if (nome !== "" && nome !== null) {
            usuarioData.nome = nome;
        }
        if (email !== "" && email !== null) {
            usuarioData.email = email;
        }
        if (senha !== "" && senha !== null) {
            const hash = bcrypt.hashSync(senha, this.saltOrRounds);
            usuarioData.senha = hash;
        }
        const usuarioUpdated = await (await AppDataSource.manager.update(Usuario, id, usuarioData)).affected;
        if (usuarioUpdated === 1) {
            return this.get(id);
        } else {
            return { error: 'Erro ao atualizar usuário' };
        }
    }
    async delete(id: number) {
        const repository = AppDataSource.getRepository(Usuario);
        const usuario = await repository.findOneBy({
            id: id
        });
        return await repository.remove(usuario);
    }
    //Vincular usuario a cargo
    async merge(usuarioCargo: UsuarioCargo) {
        return await AppDataSource.manager.save(usuarioCargo);
    }
    //Vincular usuario a departamento
    async mergeDepartamento(usuarioDepartamento: UsuarioDepartamento) {
        return await AppDataSource.manager.save(usuarioDepartamento);
    }
}