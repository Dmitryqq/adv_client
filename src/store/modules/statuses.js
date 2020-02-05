import axios from 'axios'

const state = {
    statuses: []
}

const actions = {
    async getStatuses({state, rootState}){
        if(state.statuses || state.statuses.lenght<1){
            try {
                const response = await axios.get(rootState.apiPrefix + '/statuses')
                state.statuses = response.data;
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