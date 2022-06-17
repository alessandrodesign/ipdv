import axios from "axios";

//axios.defaults.baseURL = 'http://127.0.0.1:3000/';
axios.defaults.baseURL = 'http://127.0.0.1:8081/api/';

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        const { status, data } = await axios.post('usuario/refresh', {}, {
            withCredentials: true
        });
        if (status === 200) {
            const accessToken = data.token;
            localStorage.setItem('accessToken', accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});