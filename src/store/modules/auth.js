  import axios from 'axios';
  import jwtDecode from 'jwt-decode'
  //   import {secInstance} from '../../axios'

  const state = {
      user: null,
      // token: localStorage.getItem("token") || "",
      // status: "",
      // hasLoadedOnce: false
  };

  const getters = {
      // isAuthenticated: state => !!state.token,
      // authStatus: state => state.status
  };

  const actions = {
      async authUser({ rootState, dispatch }, authData) {
          try {
              const response = await axios.post(rootState.apiPrefix + `/auth/login`, authData)
              let token = response.data;
              if (token) {
                  const dtoken = jwtDecode(token);
                  if (dtoken.enabled == true) {
                      localStorage.setItem('token', token);
                      dispatch("decodeUser");
                      dispatch("getBalance");
                      dispatch("notifications/getNotifications", {}, { root: true });
                  } else {
                      throw new Error("Учетная запись деактивирована")
                  }
              } else {
                  throw new Error("Неверный логин или пароль")
              }
          } catch (err) {
              localStorage.removeItem('token');
              if (err.status == "403") {
                  throw new Error("Неверный логин или пароль")
              } else
                  throw (err)
          }
      },

      async getBalance({ state, dispatch, rootState }) {
          try {
              if (state.user != null) {
                  const token = localStorage.getItem('token')
                  const response = await axios.get(rootState.apiPrefix + '/users/balance', { headers: { 'Authorization': 'Bearer ' + token } })
                  state.user.balance = response.data;
              }
          } catch (err) {
              dispatch('handleError', err.response, { root: true });
              throw (err);
          }
      },

      async registerUser({ rootState }, userData) {
          try {
              const response = await axios.post(rootState.apiPrefix + `/auth/register`, userData)
              if (response.data.error)
                  throw new Error(response.data.error);
          } catch (err) {
              console.log(err)
          }
      },
      async decodeUser({ commit }) {
          const token = localStorage.getItem('token');
          if (token) {
              const dtoken = jwtDecode(token);
              commit("setUser", { id: dtoken.userId, username: dtoken.username, role: dtoken.role, balance: null });
          }
      },
      logout({ commit }) {
          return new Promise(resolve => {
              localStorage.removeItem("token");
              commit("setUser", null);
              resolve();
          });
      }
  };

  const mutations = {
      setUser(state, user) {
          state.user = user;
      },
  };

  export default {
      namespaced: true,
      state,
      getters,
      actions,
      mutations
  };