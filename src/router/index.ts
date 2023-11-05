import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Job from '@/views/Job.vue';
import RoutePaths from './routes';

const routes = [
    {
        path: RoutePaths.Home,
        name: 'Home',
        component: Home,
    },
    {
        path: RoutePaths.Login,
        name: 'Login',
        component: Login,
    },
    {
        path: RoutePaths.Register,
        name: 'Register',
        component: Register,
    },
    {
        path: `${RoutePaths.Job}/:id`,
        name: 'Job',
        component: Job,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
