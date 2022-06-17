<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Usuário</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <router-link :to="{ name: 'usuarios' }" class="btn btn-sm btn-dark">
                    &longleftarrow; Voltar
                </router-link>
            </div>
        </div>

        <form id="submit" class="row g-3" @submit.prevent="submit">
            <input v-if="$route.params.id" type="hidden" name="id" id="id" :value="$route.params.id" />
            <div class="col-md-4">
                <label for="nome">Nome</label>
                <input id="nome" name="nome" type="text" class="form-control" :value="this.user.nome ?? ''" />
            </div>
            <div class="col-md-4">
                <label for="email">E-mail</label>
                <input id="email" name="email" type="email" class="form-control" :value="this.user.email ?? ''" />
            </div>
            <div class="col-md-4">
                <label for="senha">Senha</label>
                <input id="senha" name="senha" type="password" class="form-control" />
            </div>
            <div class="col-md-6">
                <label for="cargo">Cargo</label>
                <select id="cargo" name="cargo" class="form-select" @change="enableDepartamento()">
                    <option selected disabled>Selecione um cargo...</option>
                    <option v-for="(cargo, index) of this.cargos" :value="cargo.id" :key="index"
                        :selected="onSelectedCargo(cargo.id, this.user.cargo.cargo.id)">
                        {{ cargo.nome }}
                    </option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="departamento">Departamento</label>
                <select id="departamento" name="departamento" class="form-select" disabled>
                    <option selected disabled>Selecione um cargo...</option>
                    <option v-for="(departamento, index) of this.departamentos" :value="departamento.id" :key="index"
                        :selected="onSelected(departamento.id, this.user.departamento.departamento.id ?? 0)">
                        {{ departamento.nome }}</option>
                </select>
            </div>
            <div class="col-md-12">
                <button type="submit" class="btn btn-dark">Salvar</button>
            </div>
        </form>
    </main>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
import { useRouter } from 'vue-router';

export default {
    name: "UsuarioView",
    computed: mapState([
        'user', 'cargos', 'departamentos'
    ]),
    methods: {
        enableDepartamento() {
            document.getElementById('departamento').disabled = false;
        },
        onSelected(id = null, departamento = null) {
            let definedId = 0;
            if (this.$route.query.departamento !== undefined) {
                definedId = parseInt(this.$route.query.departamento);
            } else if (departamento) {
                definedId = parseInt(departamento);
            }
            return id === definedId;
        },
        onSelectedCargo(id = null, cargo = null) {
            let definedId = 0;
            if (cargo) {
                definedId = parseInt(cargo);
            }
            return id === definedId;
        }
    },
    setup() {
        const router = useRouter();
        const submit = async e => {
            const form = new FormData(e.target);
            const inputs = Object.fromEntries(form.entries());
            let id = inputs.id;
            if (id) {
                await axios.put('usuario', inputs);
            } else {
                const { data } = await axios.post('usuario', inputs);
                id = data.id;
            }
            await router.push({ name: 'usuarios' });
        }
        return {
            submit
        }
    },
    created() {
        if (this.$route.params.id) {
            this.$store.dispatch('getUser', this.$route.params.id ?? 0);
        }
        this.$store.dispatch('getCargos');
        this.$store.dispatch('getDepartamentos');
    }
}
</script>