import { SET_COUNT, SET_TAGS } from './mutation_types';
import serverClient from '@/store/http_client'

export default {
  async findAll({ commit }) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/tag`).then((response) => {
        commit(SET_TAGS, response.data)
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      })
    })

  },

  async findById(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/tag/${data.id}`).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async save(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.post('/tag', data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async update(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.put(`/tag/${data.id}`, data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async count({ commit }) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/tag/count`).then((response) => {
        console.log(response.data);
        commit(SET_COUNT, response.data)
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },


}
