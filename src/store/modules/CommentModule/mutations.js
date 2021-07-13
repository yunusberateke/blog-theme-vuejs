import { SET_COMMENTS, SET_COUNT } from "./mutation_types";

const mutations = {
    [SET_COMMENTS](state, comments){
        state.comments = comments;
    },
    [SET_COUNT](state,count){
        state.count = count;
    }
}

export default mutations;
