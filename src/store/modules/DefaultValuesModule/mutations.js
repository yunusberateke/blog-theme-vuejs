import {
    SET_DEFAULT_VALUES,
} from './mutation_types';

const mutations = {

    [SET_DEFAULT_VALUES](state,defaultValues){
        state.defaultValues = defaultValues;
    },

}

export default mutations;
