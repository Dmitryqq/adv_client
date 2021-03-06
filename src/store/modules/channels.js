import axios from 'axios'

const state = {
    channels: []
}

const actions = {
    async getChannels({state, dispatch, rootState}){
        if(state.channels || state.channels.lenght<1){
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(rootState.apiPrefix + '/channels',
                { headers: { 'Authorization': 'Bearer '+ token }}
                )
                state.channels = response.data;
            }
            catch(err){
                dispatch('handleError',err.response,{ root: true });
                throw(err);
            }
        }
        else
            return;
    },
    async getMyChannelsAdmin({dispatch, rootState}){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(rootState.apiPrefix + '/admin/mychannels',
            { headers: { 'Authorization': 'Bearer '+ token }}
            )
            return response.data;
        }
        catch(err){
            dispatch('handleError',err.response,{ root: true });
            throw(err);
        }
    },
    async getMyChannelsAgent({dispatch, rootState}){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(rootState.apiPrefix + '/agent/mychannels',
            { headers: { 'Authorization': 'Bearer '+ token }}
            )
            return response.data;
        }
        catch(err){
            dispatch('handleError',err.response,{ root: true });
            throw(err);
        }
    },
    async getMyChannelsTariffs({dispatch, rootState}){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(rootState.apiPrefix + '/my/channels/tariffs',
            { headers: { 'Authorization': 'Bearer '+ token }})
            console.log(response.data)
            return response.data;
        }
        catch(err){
            dispatch('handleError',err.response,{ root: true });
            throw(err);
        }
    },
    async addChannel({rootState, commit}, channel){
        try {    
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/channels`, channel,
            { headers: { 'Authorization': 'Bearer '+ token }})
            commit('addChannel', response.data)
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async getChannelsTariffs({ rootState}){
        try {
            const response = await axios.get(rootState.apiPrefix + '/all/channels/tariffs')
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async getChannelsAdmins({ rootState}){
        try {
            const response = await axios.get(rootState.apiPrefix + '/all/channels/admins')
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async getChannelsAgents({ rootState}){
        try {
            const response = await axios.get(rootState.apiPrefix + '/all/channels/agents')
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async addChannelAdmin({ rootState}, channelAdmin){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/channel/admin`, channelAdmin,
            { headers: { 'Authorization': 'Bearer '+ token }})
            console.log(response.data)
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async addChannelAgent({ rootState}, channelAgent){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + `/channel/agent`, channelAgent,
            { headers: { 'Authorization': 'Bearer '+ token }})
            console.log(response.data)
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    },
    async uploadLogo({rootState}, file) {
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + '/channel/logo', file, { headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ token 
            }})
            return response;
        }
        catch(err){
            // dispatch('handleError',err.response,{ root: true });
            console.log(err);
        }
    },
}

const mutations = {
    addChannel(state, channel){
        state.channels.push({
            id: channel.id,
            name: channel.name,
            description: channel.description,
            logo: channel.logo,
            max_ads_per_day: channel.max_ads_per_day,
            create_date: channel.create_date,
            update_date: channel.update_date
        })
    },
    setChannels(state, channels){
        state.channels = channels;
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}