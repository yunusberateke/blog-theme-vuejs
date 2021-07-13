import {
    CLEAR_STATE,
    SET_POSTS,
    SET_COUNT,
} from './mutation_types';
import defaultState from './state'

const mutations = {

    [SET_POSTS](state,posts){
        state.posts = posts;
    },

    [CLEAR_STATE](state){
        Object.assign(state, defaultState())
    },

    [SET_COUNT](state, count){
        state.count = count;
    },
}

export default mutations;
