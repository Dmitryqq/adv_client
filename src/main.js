import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import jwtDecode from 'jwt-decode'
import VCalendar from 'v-calendar'

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.use(VCalendar, {
    componentPrefix: 'vc'
});


// const token = localStorage.getItem('user-token')
// if (token) {
//   axios.defaults.headers.common['Authorization'] = token
// }

export const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach(async(to, from, next) => {
    if (!to.matched.some(record => record.meta.requiresAuth))
        return next();
    const token = localStorage.getItem('token')
    if (token == null) {
        return next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    }
    const dtoken = jwtDecode(localStorage.token);
    const expDate = new Date(dtoken.exp * 1000)
    if (expDate < new Date()) {
        localStorage.removeItem("token");
        return next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }
    if (!to.meta.roles)
        return next()
    if (to.meta.roles.includes('main-admin')) {
        if (dtoken.role === 'Главный администратор')
            return next()
        else
            return next({ path: '/forbidden' })
    }
    if (to.meta.roles.includes('loader')) {
        if (dtoken.rules === 'Загрузчик' || dtoken.rules === 'Администратор')
            return next()
        else
            return next({ path: '/forbidden' })
    }
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')