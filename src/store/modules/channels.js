import axios from 'axios'

const state = {
    channels: []
}

const actions = {
    async getChannels({state, rootState}){
        if(state.channels || state.channels.lenght<1){
            try {
                const response = await axios.get(rootState.apiPrefix + '/channels')
                state.channels = response.data;
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