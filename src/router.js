import { createRouter,createWebHistory } from "vue-router";
import LoginAcc from './pages/LoginAcc.vue';
import CreateAcc from './pages/CreateAcc.vue';
import MainPage from "./pages/MainPage.vue";
import HomeView from "./global/HomeView.vue";
import SingleUser from "./pages/SingleUser.vue";
import auth from "./middlewares/auth";
const router = createRouter({
    history: createWebHashHistory(),

    routes:[
        {
            path: '/',
            component: MainPage,
            beforeEnter: [auth]
        },
        {
            path: '/MainPage',
            component: MainPage,
            beforeEnter: [auth]
        },
        {
            path: '/login',
            component: LoginAcc,
            name: 'Login'
        },
        {
            path: '/create',
            component: CreateAcc
        },
        {
            path: '/homeView',
            component: HomeView
        },
        {
            path: '/user/:userId',
            component: SingleUser,
            props: true
        }
    ]
})

export default router
