import { Departamento } from "../entity/Departamento";
import { UsuarioDepartamento } from "../entity/UsuarioDepartamento";

import { AppDataSource } from "../data-source";

export class DepartamentoController {
    async salvar(departamento: Departamento) {
        return await AppDataSource.manager.save(departamento);
    }
    async departamentos() {
        return await AppDataSource.manager.find(Departamento);
    }
    async get(id: number) {
        const repository = AppDataSource.getRepository(Departamento);
        return await repository.findOneBy({
            id: id
        });
    }
    async update(id: number, nome: string | null) {
        const departamentoData = { nome: undefined};
        if (nome !== "" && nome !== null) {
            departamentoData.nome = nome;
        }
        const departamentoDataUpdated = await (await AppDataSource.manager.update(Departamento, id, departamentoData)).affected;
        if (departamentoDataUpdated === 1) {
            return this.get(id);
        } else {
            return { error: 'Erro ao atualizar departamento' };
        }
    }
    async getUsers(id: number) {
        const repository = AppDataSource.getRepository(UsuarioDepartamento);
        return await repository.find({
            relations: {
                departamento: true,
                usuario: true,
            },
            where: { departamento: { id: id } },
        });
    }
    async delete(id: number) {
        const repository = AppDataSource.getRepository(Departamento);
        const departamento = await repository.findOneBy({
            id: id
        });
        return await repository.remove(departamento);
    }
    //Vincular usuario a departamento
    async merge(usuarioDepartamento: UsuarioDepartamento) {
        return await AppDataSource.manager.save(usuarioDepartamento);
    }
}