import axios from 'axios'

const state = {
    advertisements: []
}

const actions = {
    async getAdvertisements({state, rootState}){
        if(state.advertisements || state.advertisements.lenght<1){
            try {
                const response = await axios.get(rootState.apiPrefix + '/ads')
                state.advertisements = response.data;
            }
            catch(err){
                console.log(err);
            }
        }
        else
            return;
    },
    async getAdvertisementChannel({rootState}, id){
        try {
            const response = await axios.get(rootState.apiPrefix + `/ads/${id}/channel`)
            console.log(response.data)
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    }    
}

export default{
    namespaced: true,
    state,
    actions
}