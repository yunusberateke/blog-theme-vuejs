import {
    CLEAR_STATE,
    SET_PORTFOLIOS,
    SET_COUNT,
} from './mutation_types';
import defaultState from './state'

const mutations = {

    [SET_PORTFOLIOS](state,portfolios){
        state.portfolios = portfolios;
    },

    [CLEAR_STATE](state){
        Object.assign(state, defaultState())
    },

    [SET_COUNT](state, count){
        state.count = count;
    },
}

export default mutations;
