import axios from 'axios';
//   import {secInstance} from '../../axios'

const state = {
    notifications: [],
};

const actions = {
    async getNotifications({ dispatch, rootState, commit }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(rootState.apiPrefix + '/notifications', { headers: { 'Authorization': 'Bearer ' + token } })
            commit('setNotifications', response.data);
        } catch (err) {
            dispatch('handleError', err.response, { root: true });
            throw (err);
        }
    },
    async removeNotification({ dispatch, rootState, commit }, id) {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(rootState.apiPrefix + '/notifications/' + id, { headers: { 'Authorization': 'Bearer ' + token } })
                .then(() => {
                    commit('deleteNotification', id);
                    return
                })
        } catch (err) {
            dispatch('handleError', err.response, { root: true });
            throw (err);
        }
    },
};

const mutations = {
    setNotifications(state, notifications) {
        state.notifications = notifications;
    },
    deleteNotification(state, id) {
        const i = state.notifications.findIndex(b => {
            return b.id == id
        })
        state.notifications.splice(i, 1)
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};