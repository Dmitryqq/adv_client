import Users from './views/Users'
import Test from './views/Test'
import Advertisement from './views/Advertisement'
import Channels from './views/Channels'
import AdvertisementCreate from './views/AdvertisementCreate'
import Login from './views/Login'



const routes = [
    { path: '/test', component: Test},
    { path: '/users', component: Users },
    { path: '/ads/:id', component: Advertisement},
    { path: '/create', component: AdvertisementCreate},
    { path: '/channels', component: Channels,meta: {requiresAuth: true, roles: ['main-admin']} },
    { path: '/login', component: Login }
]

export default routes;