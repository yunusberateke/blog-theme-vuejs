import { 
    CLEAR_STATE,
    SET_PORTFOLIO_CATEGORY,
    SET_COUNT,
} from './mutation_types';
import defaultState from './state'

const mutations = {

    [SET_PORTFOLIO_CATEGORY](state,portfolio_category){
        state.portfolio_category = portfolio_category;
    },

    [CLEAR_STATE](state){
        Object.assign(state, defaultState())
    },

    [SET_COUNT](state, count){
        state.count = count;
    },
}

export default mutations;