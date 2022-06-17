<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Cargo</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <router-link :to="{ name: 'cargos' }" class="btn btn-sm btn-dark">
                    &longleftarrow; Voltar
                </router-link>
            </div>
        </div>

        <form id="submit" class="row g-3" @submit.prevent="submit">
            <input v-if="$route.params.id" type="hidden" name="id" id="id" :value="$route.params.id" />
            <div class="col-md-4">
                <label for="nome">Nome</label>
                <input id="nome" name="nome" type="text" class="form-control" :value="this.cargo.nome ?? ''" />
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
    name: "CargoView",
    computed: mapState([
        'cargo'
    ]),
    setup() {
        const router = useRouter();
        const submit = async e => {
            const form = new FormData(e.target);
            const inputs = Object.fromEntries(form.entries());
            let id = inputs.id;
            if (id) {
                await axios.put('cargo', inputs);
            } else {
                const { data } = await axios.post('cargo', inputs);
                id = data.id;
            }
            await router.push({ name: 'cargos' });
        }
        return {
            submit
        }
    },
    created() {
        if (this.$route.params.id) {
            this.$store.dispatch('getCargo', this.$route.params.id ?? 0);
        }
    }
}
</script>