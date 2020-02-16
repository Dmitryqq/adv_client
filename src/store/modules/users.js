import axios from 'axios'

const state = {
    users: []
}

const actions = {
    async getUsers({state, dispatch, rootState}){
        if(state.users || state.users.lenght<1){
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/users',
                     { headers: { 'Authorization': 'Bearer '+ token }}
                )
                state.users = response.data;
            }
            catch(err){
                dispatch('handleError',err.response,{ root: true });
                throw(err);
            }
        }
        else
            return;
    },
}

export default{
    namespaced: true,
    state,
    actions,
    
}