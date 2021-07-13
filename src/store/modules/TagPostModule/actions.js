import serverClient from '@/store/http_client'

export default {
    async findAll(_, data) {
      return new Promise((resolve, reject) =>{
            serverClient.get(`/tagpost?page=${data.page}`).then((response)=>{
                resolve(response.data.data);
            }).catch((error) =>{
                reject(error);
            })
        })

    },

    async count() {
      return new Promise((resolve, reject) =>{
          serverClient.get(`/tagpost/count`).then((response)=>{
              resolve(response.data);
          }).catch((error) =>{
              reject(error);
          })
      })
    },

    async findByPostId(_, data) {
      return new Promise((resolve, reject) => {
        serverClient.get(`/tagpost/findByPostId/${data.postId}`).then((response)=>{
          resolve(response.data)
        }).catch((error) =>{
          reject(error);
        })
      })
    },

    async save(_,data){
      return new Promise((resolve,reject) => {
        serverClient.post('/tagpost', data).then((response)=>{
          resolve(response.data)
        }).catch((error)=>{
          reject(error)
        })
      })
    },

    async findById(_, data) {
      return new Promise((resolve, reject) => {
        serverClient.get(`/tagpost/${data.id}`).then((response)=>{
          resolve(response.data);
        }).catch((error) =>{
          reject(error);
        })
      })
    }
}
