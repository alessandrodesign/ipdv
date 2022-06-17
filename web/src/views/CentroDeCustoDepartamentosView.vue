<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Departamentos</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                 <router-link :to="{ name: 'centros' }" class="btn btn-sm btn-dark mx-3">
                    &longleftarrow; Voltar
                </router-link>
                <router-link :to="{ name: 'departamento' }" class="btn btn-sm btn-outline-dark">
                    Adicionar
                </router-link>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(departamento, index) in this.departamentos" :key="index">
                        <th>{{ departamento.departamento.id }}</th>
                        <td>{{ departamento.departamento.nome }}</td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <router-link :to="{ name: 'departamento-usuarios', params: { id: departamento.departamento.id } }" class="btn btn-dark">
                                    Usuários
                                </router-link>
                                <router-link :to="{ name: 'departamento', params: { id: departamento.departamento.id } }" class="btn btn-success">
                                    Editar
                                </router-link>
                                <button class="btn btn-danger"
                                    @click="this.$store.dispatch('removeDepartamento', departamento.departamento.id)">Excluír</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "CentroDeCustoDepartamentosView",
    computed: mapState([
        'departamentos'
    ]),
    created() {
        this.$store.dispatch('getCentroDeCustoDepartamentos', this.$route.params.id ?? 0);
    }
}
</script>