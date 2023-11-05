import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Job from '@/views/Job.vue';
import UserJobs from '@/views/UserJobs.vue';
import RoutePaths from './routes';
import { useJobsStore } from '@/stores/jobs';

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
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    console.log(to);
    let title = to.meta.title as string;

    if (to.name === 'Job') {
        const jobStore = useJobsStore();
        const jobId = to.params.id;

        if (jobId) {
            const job = jobStore.getJobById(Number(jobId));
            if (job) {
                title = `Job - ${job?.title}`;
            }
        }
    }
    document.title = title ? title : 'Awesome Job Site';

    next();
});

export default router;
