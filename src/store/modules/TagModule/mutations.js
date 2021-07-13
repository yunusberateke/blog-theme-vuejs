import {
    CLEAR_STATE,
    SET_COUNT,
    SET_TAGS,
} from './mutation_types';
import defaultState from './state'

const mutations = {

    [SET_TAGS](state,tags){
        state.tags = tags;
    },

    [CLEAR_STATE](state){
        Object.assign(state, defaultState())
    },

    [SET_COUNT](state,count){
        state.count = count;
    }
}

export default mutations;
