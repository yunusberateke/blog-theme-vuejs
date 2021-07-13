import {SET_DEFAULT_VALUES} from './mutation_types';
import serverClient from '@/store/http_client'

export default {
    async findAll({commit}) {
        return new Promise((resolve, reject) =>{
            serverClient.get(`/defaultvalues`).then((response)=>{
                commit(SET_DEFAULT_VALUES, response.data.data)
                resolve(response.data.data);
            }).catch((error) =>{
                reject(error);
            })
        })

    },

    async cvDownload(){
      return new Promise((resolve, reject)=>{
        serverClient.get("/get-my-cv", {responseType:"blob"}).then((res)=>{
          const file = res.data;
          resolve(file)
        }).catch((error) => {
          reject(error);
        })
      })
    }
}
