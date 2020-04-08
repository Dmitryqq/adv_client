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
    async getMyAdvertisements({state, rootState}){
        if(state.advertisements || state.advertisements.lenght<1){
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/myads',
                { headers: { 'Authorization': 'Bearer '+ token }})
                console.log(response.data)
                state.advertisements = response.data;
            }
            catch(err){
                console.log(err);
            }
        }
        else
            return;
    },
    async getAdsOnMyChannel({rootState}){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(rootState.apiPrefix + '/adsonmychannel',
            { headers: { 'Authorization': 'Bearer '+ token }})
            console.log(response.data)
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async getAdvertisementChannel({rootState}, id){
        try {
            const response = await axios.get(rootState.apiPrefix + `/ads/${id}/channel`)
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async addAdvertisement({rootState}, ad){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/ads`, ad,
            { headers: { 'Authorization': 'Bearer '+ token }})
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async addAdvertisementChannel({rootState}, advChannel){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/ads/${advChannel.advertisementId}/channel`, advChannel,
            { headers: { 'Authorization': 'Bearer '+ token }})
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async addAdvertisementChannelDates({rootState}, advChannelDates){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/ads/${advChannelDates.advertisementchannelId}/date`, advChannelDates,
            { headers: { 'Authorization': 'Bearer '+ token }})
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