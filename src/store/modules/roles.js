import axios from 'axios'

const state = {
    roles: []
}

const actions = {
    async getRoles({state, rootState}){
        if(state.roles || state.roles.lenght<1){
            try {
                const response = await axios.get(rootState.apiPrefix + '/roles')
                state.roles = response.data;
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