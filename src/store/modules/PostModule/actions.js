import { SET_POSTS, SET_COUNT } from './mutation_types';
import serverClient from '@/store/http_client'

export default {
  async findAll({ commit }, data) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/post?page=${data.page}`).then((response) => {
        commit(SET_POSTS, response.data.data)
        resolve(response.data.data);
      }).catch((error) => {
        reject(error);
      })
    })

  },

  async count({ commit }) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/post/count`).then((response) => {
        commit(SET_COUNT, response.data)
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async findByCategoryId(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/post/findByCategoryId/${data.categoryId}?page=${data.page}`).then((response) => {
        resolve(response.data.data)
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async countByCategoryId(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/post/countByCategoryId/${data.categoryId}`).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async findById(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.get(`/post/${data.id}`).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },

  async save(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.post('/post', data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async update(_, data) {
    return new Promise((resolve, reject) => {

      serverClient.put(`/post/${data.id}`, data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async delete(_, data) {
    return new Promise((resolve, reject) => {
      serverClient.delete(`/post/${data.id}`).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
