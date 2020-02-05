import axios from 'axios'

const state = {
    tariffs: []
}

const actions = {
    async getTariffs({state, rootState}){
        if(state.tariffs || state.tariffs.lenght<1){
            try {
                const response = await axios.get(rootState.apiPrefix + '/tariffs')
                state.tariffs = response.data;
            }
            catch(err){
                console.log(err);
            }
        }
        else
            return;
    }
}

export default{
    namespaced: true,
    state,
    actions
}