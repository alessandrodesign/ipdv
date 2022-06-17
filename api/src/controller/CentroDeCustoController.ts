import { CentroDeCusto } from "../entity/CentroDeCusto";
import { DepartamentoCentroDeCusto } from "../entity/DepartamentoCentroDeCusto";

import { AppDataSource } from "../data-source";

export class CentroDeCustoController {
    async salvar(centroDeCusto: CentroDeCusto) {
        return await AppDataSource.manager.save(centroDeCusto);
    }
    async centros() {
        return await AppDataSource.manager.find(CentroDeCusto);
    }
    async get(id: number) {
        const repository = AppDataSource.getRepository(CentroDeCusto);
        return await repository.findOneBy({
            id: id
        });
    }
    async update(id: number, nome: string | null) {
        const centroData = { nome: undefined};
        if (nome !== "" && nome !== null) {
            centroData.nome = nome;
        }
        const centroDataUpdated = await (await AppDataSource.manager.update(CentroDeCusto, id, centroData)).affected;
        if (centroDataUpdated === 1) {
            return this.get(id);
        } else {
            return { error: 'Erro ao atualizar centro de custo' };
        }
    }
    async getDepartments(id: number) {
        const repository = AppDataSource.getRepository(DepartamentoCentroDeCusto);
        return await repository.find({
            relations: {
                departamento: true,
                centroDeCusto: true,
            },
            where: { centroDeCusto: { id: id } },
        });
    }
    async delete(id: number) {
        const repository = AppDataSource.getRepository(CentroDeCusto);
        const centroDeCusto = await repository.findOneBy({
            id: id
        });
        return await repository.remove(centroDeCusto);
    }
    //Vincular departamento a centro de custo
    async merge(DepartamentoCentroDeCusto: DepartamentoCentroDeCusto) {
        return await AppDataSource.manager.save(DepartamentoCentroDeCusto);
    }
}