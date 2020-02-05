import Users from './views/Users'
import Test from './views/Test'
import Advertisements from './views/Advertisements'
import Channels from './views/Channels'

const routes = [
    { path: '/test', component: Test},
    { path: '/users', component: Users},
    { path: '/ads/:id', component: Advertisements},
    { path: '/channels', component: Channels}
]

export default routes;