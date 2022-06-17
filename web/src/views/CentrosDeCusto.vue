<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Centros de custo</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <router-link :to="{ name: 'centro' }" class="btn btn-sm btn-dark">
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
                    <tr v-for="(centro, index) in this.centrosDeCusto" :key="index">
                        <th>{{ centro.id }}</th>
                        <td>{{ centro.nome }}</td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <router-link :to="{ name: 'centro-departamentos', params: { id: centro.id } }" class="btn btn-dark">
                                    Departamentos
                                </router-link>
                                <router-link :to="{ name: 'centro', params: { id: centro.id } }" class="btn btn-success">
                                    Editar
                                </router-link>
                                <button class="btn btn-danger"
                                    @click="this.$store.dispatch('removeCentroDeCusto', centro.id)">Excluír</button>
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
    name: "CentrosDeCustoView",
    computed: mapState([
        'centrosDeCusto'
    ]),
    created() {
        this.$store.dispatch('getCentrosDeCusto');
    }
}
</script>