<template>
    <div class="login-block">
        <div class="container py-5">
            <div class="row justify-content-center my-5 py-5">
                <div class="col-md-4 col-5">
                    <main class="form-signin w-100 m-auto">
                        <form @submit.prevent="submit">
                            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                            <div class="form-floating">
                                <input type="email" class="form-control" id="email" name="email"
                                    value="alessandrodesign360@gmail.com" placeholder="name@example.com">
                                <label for="email">Email address</label>
                            </div>
                            <div class="form-floating my-3">
                                <input type="password" class="form-control" id="senha" name="senha"
                                    placeholder="Password" value="123456789">
                                <label for="senha">Password</label>
                            </div>
                            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                            <p class="mt-5 mb-3 text-muted">&copy; {{ this.currentYear }}</p>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: "LoginView",
    methods: {
    },
    setup() {
        const router = useRouter();
        const submit = async e => {
            const form = new FormData(e.target);
            const inputs = Object.fromEntries(form.entries());
            const { data } = await axios.post('usuario/login', inputs, {
                withCredentials: true
            });
            if (data.token) {
                const accessToken = data.token;
                localStorage.setItem('accessToken', accessToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                await router.push('/dashboard');
            }
        }
        return {
            submit
        }
    },
    data() {
        return { currentYear: new Date().getFullYear(), }
    }
}
</script>

<style lang="scss">
.login {
    &-block {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        z-index: 10000;
    }
}
</style>