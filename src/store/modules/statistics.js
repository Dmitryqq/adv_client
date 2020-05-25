import axios from 'axios'

const actions = {
    async getStatisticsForMonth({ rootState }, settings) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + '/formonth', settings, { headers: { 'Authorization': 'Bearer ' + token } })
            return response.data;
        } catch (err) {
            console.log(err);
        }
    },
    async getStatisticsForRange({ rootState }, settings) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(rootState.apiPrefix + '/betweendates', settings, { headers: { 'Authorization': 'Bearer ' + token } })
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default {
    namespaced: true,
    actions
}