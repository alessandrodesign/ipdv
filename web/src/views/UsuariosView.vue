<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Usuários</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <router-link :to="{ name: 'usuario' }" class="btn btn-sm btn-dark">
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
                        <th scope="col">Cargo</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in this.users" :key="index">
                        <th>{{ user.id }}</th>
                        <td>{{ user.nome }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.cargo ? user.cargo.cargo.nome : 'N/A' }}</td>
                        <td>{{ user.departamento ? user.departamento.departamento.nome : 'N/A' }}</td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <router-link :to="{ name: 'usuario', params: { id: user.id } }" class="btn btn-success"
                                    :class="currentUser(user.id) ? 'disabled' : ''">
                                    Editar
                                </router-link>
                                <button class="btn btn-danger" @click="this.$store.dispatch('removeUser', user.id)"
                                    :disabled="currentUser(user.id)">Excluír</button>
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
    name: "UsuariosView",
    computed: mapState([
        'users'
    ]),
    methods: {
        currentUser(id) {
            return parseInt(localStorage.getItem('currentUserId')) === parseInt(id);
        }
    },
    created() {
        this.$store.dispatch('getUsers');
    }
}
</script>