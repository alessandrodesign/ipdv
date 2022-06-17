import { Cargo } from "../entity/Cargo";

import { AppDataSource } from "../data-source";

export class CargoController {
    async salvar(cargo: Cargo) {
        return await AppDataSource.manager.save(cargo);
    }
    async cargos() {
        return await AppDataSource.manager.find(Cargo);
    }
    async get(id: number) {
        const repository = AppDataSource.getRepository(Cargo);
        return await repository.findOneBy({
            id: id
        });
    }
    async update(id: number, nome: string | null) {
        const cargoData = { nome: undefined};
        if (nome !== "" && nome !== null) {
            cargoData.nome = nome;
        }
        const cargoDataUpdated = await (await AppDataSource.manager.update(Cargo, id, cargoData)).affected;
        if (cargoDataUpdated === 1) {
            return this.get(id);
        } else {
            return { error: 'Erro ao atualizar departamento' };
        }
    }
    async delete(id: number) {
        const repository = AppDataSource.getRepository(Cargo);
        const cargo = await repository.findOneBy({
            id: id
        });
        return await repository.remove(cargo);
    }
}