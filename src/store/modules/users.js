import axios from 'axios'

const state = {
    users: [],
    user: {}
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
    async getAccountDetails({state, dispatch, rootState}){
        if(Object.entries(state.user).length == 0){
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/users/account',
                     { headers: { 'Authorization': 'Bearer '+ token }}
                )
                state.user = response.data;
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