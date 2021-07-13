import { SET_USER, SET_ACCESS_KEY } from './mutation_types';
import serverClient from '@/store/http_client'

export default {
    async login({ commit }) {
        return new Promise((resolve, reject) => {
            serverClient.post(`/auth/login`, { email: "yunusberateke@gmail.com", password: "123qwe++" }).then((response) => {
                commit(SET_USER, response.data.user);
                commit(SET_ACCESS_KEY, response.data.access_token);
                localStorage.setItem("user", response.data.user);
                localStorage.setItem("access_key", response.data.access_token);
                serverClient.defaults.headers.common["Authorization"] = "Bearer" + response.data.access_token;
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })

    },
}
