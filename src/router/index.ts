import {
    createWebHistory,
    createRouter,
    RouteLocationNormalized,
    NavigationGuardNext,
} from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Job from '@/views/Job.vue';
import UserJobs from '@/views/UserJobs.vue';
import RoutePaths from './routes';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';
import RoutesPaths from './routes';
import ForgotPassword from '@/views/ForgotPassword.vue';

const routes = [
    {
        path: RoutePaths.Home,
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home',
        },
    },
    {
        path: RoutePaths.Login,
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login',
        },
    },
    {
        path: RoutePaths.Register,
        name: 'Register',
        component: Register,
        meta: {
            title: 'Registration',
        },
    },
    {
        path: `${RoutePaths.Job}/:id`,
        name: 'Job',
        component: Job,
        meta: {
            title: 'Job Application',
        },
    },
    {
        path: RoutePaths.UserJobs,
        name: 'UserJobs',
        component: UserJobs,
        meta: {
            title: 'Your jobs',
            requiresAuth: true,
        },
    },
    {
        path: RoutesPaths.ForgotPassword,
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    let title = to.meta.title as string;

    if (to.name === 'Job') {
        title =
            setJobPageTitle(Number(to.params.id)) ?? (to.meta.title as string);
    }
    document.title = title ? title : 'Awesome Job Site';

    authGuard(to, next);

    next();
});

function authGuard(to: RouteLocationNormalized, next: NavigationGuardNext) {
    const userStore = useUserStore();

    if (!userStore.isLoggedIn && to.meta.requiresAuth) {
        next({ name: 'Login' });
    }

    if (
        userStore.isLoggedIn &&
        (to.name === 'Login' ||
            to.name === 'Register' ||
            to.name === 'ForgotPassword')
    ) {
        next({ name: 'Home' });
    }
}

function setJobPageTitle(jobId: number): string | null {
    const jobStore = useJobsStore();
    let title = null;

    if (jobId) {
        const job = jobStore.getJobById(jobId);
        if (job) {
            title = `Job - ${job?.title}`;
        }
    }

    return title;
}

export default router;
