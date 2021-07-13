import {SET_CATEGORY} from './mutation_types';
import serverClient from '@/store/http_client'

export default {
    async findAll({commit}) {
        //&page=${data.page}&size=${data.size}&sort=id,desc
        return new Promise((resolve, reject) =>{
            serverClient.get(`/category`).then((response)=>{
                commit(SET_CATEGORY, response.data)
                resolve(response.data);
            }).catch((error) =>{
                reject(error);
            })
        })

    },

    async save(_,data) {
        return new Promise((resolve, reject) => {
            serverClient.post("/category", data).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                reject(error)
            })
        })
    },

    async update(_,data) {
        return new Promise((resolve, reject) => {
            serverClient.put(`/category/${data.id}`, data).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                reject(error)
            })
        })
    },

    async findById(_,data) {
        return new Promise((resolve, reject)=>{
            serverClient.get(`/category/${data.id}`).then((response)=>{
                resolve(response.data);
            }).catch((error)=>{
                reject(error);
            })
        })
    },

}
