import {
    CLEAR_STATE,
    SET_USER,
    SET_ACCESS_KEY,
} from './mutation_types';
import defaultState from './state'

const mutations = {

    [SET_USER](state,user){
        state.user = user;
    },

    [CLEAR_STATE](state){
        Object.assign(state, defaultState())
    },

    [SET_ACCESS_KEY](state, access_key){
        state.access_key = access_key;
    },
}

export default mutations;
