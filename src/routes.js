import Users from './views/Users'
import Test from './views/Test'
import Advertisement from './views/Advertisement'
import Channels from './views/Channels'
import AdvertisementCreate from './views/AdvertisementCreate'
import Login from './views/Login'
import Register from './views/Register'
import ChannelAdmins from './views/ChannelAdmins'



const routes = [
    { path: '/test', component: Test},
    { path: '/users', component: Users },
    { path: '/ads/:id', component: Advertisement},
    { path: '/create', component: AdvertisementCreate},
    { path: '/channels', name: 'channels', component: Channels,meta: {requiresAuth: true, roles: ['main-admin']}},
    //     children: [
    //         { 
    //             path: 'admins', name: 'admins', component: ChannelAdmins, 
    //             meta: { 
    //                 requiresAuth: true,
    //                 roles:['main-admin']
    //             }
    //         }
    //     ]
    // },
    { path: '/channels/admins', component: ChannelAdmins,meta: {requiresAuth: true, roles: ['main-admin']}},
    { path: '/login', component: Login },
    { path: '/register', component: Register },
]

export default routes;