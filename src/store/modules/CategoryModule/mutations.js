import {
    CLEAR_STATE,
    SET_CATEGORY,
    SET_COUNT,
} from './mutation_types';
import defaultState from './state'

const mutations = {

    [SET_CATEGORY](state,post_category){
        state.post_category = post_category;
    },

    [CLEAR_STATE](state){
        Object.assign(state, defaultState())
    },

    [SET_COUNT](state, count){
        state.count = count;
    },
}

export default mutations;
