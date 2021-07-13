import { SET_PORTFOLIO_CATEGORY } from './mutation_types';
import serverClient from '@/store/http_client'

export default {
    async findAll({ commit }) {
        return new Promise((resolve, reject) => {
            serverClient.get(`/portfoliocategory`).then((response) => {
                commit(SET_PORTFOLIO_CATEGORY, response.data)
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    async findById(_, categoryId) {
        return new Promise((resolve, reject) => {
            serverClient.get(`/portfoliocategory/${categoryId}`).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    async save(_, data) {
        return new Promise((resolve, reject) => {
            serverClient.post('/portfoliocategory', data).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error);
            })
        })
    },
    async update(_, data) {
        return new Promise((resolve, reject) => {
            serverClient.put(`/portfoliocategory/${data.id}`, data).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error);
            })
        })
    }
}

