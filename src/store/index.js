import Vue from 'vue'
import Vuex from 'vuex'
// import {router} from '../main'
import roles from './modules/roles'
import users from './modules/users'
import statuses from './modules/statuses'
import tariffs from './modules/tariffs'
import advertisements from './modules/advertisements'
import channels from './modules/channels'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    roles,
    users,
    statuses,
    tariffs,
    advertisements,
    channels
  },
  state:{
      apiPrefix: 'http://localhost:5000'
  },
  // actions:{
  //   handleError({},err){
  //     if(!err || !err.status)
  //       return;
  //     if(err.status == "403")
  //       router.push('/forbidden')
  //     else 
  //       if(err.status == "404")
  //         router.push('/notfound')
  //       else
  //         router.push('/server_error')
  //   }
  // }
})