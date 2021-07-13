import serverClient from '@/store/http_client'
import { SET_COMMENTS, SET_COUNT } from './mutation_types';

export default {
  async findAll({ commit }, data) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/comment/?page=${data.page}`).then((response) => {
        resolve(response.data.data);
        commit(SET_COMMENTS, response.data.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async findByPostId(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/comment/findByPostId/${data.postId}`).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async save(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.post(`/comment/`, data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error);
      })
    })
  },
  
  async update(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.put(`/comment/${data.id}`, data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async count({ commit }) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/comment/count/`).then((response) => {
        resolve(response.data);
        commit(SET_COUNT, response.data);
      }).catch((error) => {
        reject(error);
      })
    })
  }
}
