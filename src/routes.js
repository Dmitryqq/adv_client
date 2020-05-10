import Users from './views/Users'
import Test from './views/Test'
import MyAdvertisements from './views/MyAdvertisements'
import AdsOnMyChannel from './views/AdsOnMyChannel'
import Channels from './views/Channels'
import AdvertisementCreate from './views/AdvertisementCreate'
import Login from './views/Login'
import Register from './views/Register'
import ChannelAdmins from './views/ChannelAdmins'
import ChannelAgents from './views/ChannelAgents'
import ChannelTariffs from './views/ChannelTariffs'
import Profile from './views/Profile'



const routes = [
    { path: '/test', component: Test },
    { path: '/users', component: Users },
    { path: '/ads', component: MyAdvertisements, meta: { requiresAuth: true } },
    { path: '/adsonmychannels', component: AdsOnMyChannel, meta: { requiresAuth: true } },
    { path: '/create', component: AdvertisementCreate, meta: { requiresAuth: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },
    {
        path: '/channels',
        name: 'channels',
        component: Channels,
        meta: { requiresAuth: true, roles: ['main-admin'] },
        // children: [{
        //         path: 'admins',
        //         name: 'admins',
        //         component: ChannelAdmins,
        //         meta: {
        //             requiresAuth: true,
        //             roles: ['main-admin']
        //         }
        //     },
        //     { path: 'agents', component: ChannelAgents, meta: { requiresAuth: true } },
        //     { path: 'tariffs', component: ChannelTariffs, meta: { requiresAuth: true } },
        // ]
    },
    { path: '/channels/admins', component: ChannelAdmins, meta: { requiresAuth: true, roles: ['main-admin'] } },
    { path: '/channels/agents', component: ChannelAgents, meta: { requiresAuth: true } },
    { path: '/channels/tariffs', component: ChannelTariffs, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
]

export default routes;