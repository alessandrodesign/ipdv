<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Usuários</h1>
            <div class="btn-toolbar mb-2 mb-md-0 g-3">
                <router-link :to="{ name: 'departamentos' }" class="btn btn-sm btn-dark mx-3">
                    &longleftarrow; Voltar
                </router-link>
                <router-link :to="{ name: 'usuario', query: { departamento: this.$route.params.id } }"
                    class="btn btn-sm btn-outline-dark">
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
                        <th scope="col">E-mail</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in this.users" :key="index">
                        <th>{{ user.usuario.id }}</th>
                        <td>{{ user.usuario.nome }}</td>
                        <td>{{ user.usuario.email }}</td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <router-link :to="{ name: 'usuario', params: { id: user.usuario.id } }"
                                    class="btn btn-success" :class="currentUser(user.usuario.id) ? 'disabled' : ''">
                                    Editar
                                </router-link>
                                <button class="btn btn-danger"
                                    @click="this.$store.dispatch('removeUser', user.usuario.id)"
                                    :disabled="currentUser(user.usuario.id)">Excluír</button>
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
    name: "DepartamentoUsuariosView",
    computed: mapState([
        'users'
    ]),
    methods: {
        currentUser(id) {
            return parseInt(localStorage.getItem('currentUserId')) === parseInt(id);
        }
    },
    created() {
        this.$store.dispatch('getDepartamentoUsers', this.$route.params.id ?? 0);
    }
}
</script>