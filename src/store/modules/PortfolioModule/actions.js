import {SET_PORTFOLIOS, SET_COUNT} from './mutation_types';
import serverClient from '@/store/http_client'

export default {
    async findAll({commit}, data) {
        return new Promise((resolve, reject) =>{
            serverClient.get(`/portfolio?page=${data.page}`).then((response)=>{

                commit(SET_PORTFOLIOS, response.data.data)
                resolve(response.data.data);
            }).catch((error) =>{
                reject(error);
            })
        })

    },

    async findById(_,data){
      return new Promise((resolve,reject) => {
        serverClient.get(`/portfolio/${data.id}`, data).then((response)=>{
          resolve(response.data)
        }).catch((error)=>{
          reject(error)
        })
      })
    },

    async count({commit}) {
      return new Promise((resolve, reject) =>{
          serverClient.get(`/portfolio/count`).then((response)=>{
              commit(SET_COUNT, response.data)
              resolve(response.data);
          }).catch((error) =>{
              reject(error);
          })
      })
    },

    async findByCategoryId(_, data) {
      return new Promise((resolve, reject) => {
        serverClient.get(`/portfolio/findByCategoryId/${data.categoryId}?page=${data.page}`).then((response)=>{
          resolve(response.data.data)
        }).catch((error) =>{
          reject(error);
        })
      })
    },

    async countByCategoryId(_, data) {
      return new Promise((resolve, reject)=>{
        serverClient.get(`/portfolio/countByCategoryId/${data.categoryId}`).then((response)=>{
          resolve(response.data)
        }).catch((error) =>{
          reject(error);
        })
      })
    },

    async save(_,data){
      return new Promise((resolve,reject) => {
        serverClient.post('/portfolio', data).then((response)=>{
          resolve(response.data)
        }).catch((error)=>{
          reject(error)
        })
      })
    },

    async update(_,data){
      return new Promise((resolve,reject) => {
        
        serverClient.put(`/portfolio/${data.id}`, data).then((response)=>{
          resolve(response.data)
        }).catch((error)=>{
          reject(error)
        })
      })
    }
}
