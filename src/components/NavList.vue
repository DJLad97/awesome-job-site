<template>
    <li v-if="isLoggedIn" class="self-center font-bold pr-6">
        {{ loggedInUser && loggedInUser.name }}
    </li>
    <li v-for="link in activeLinks">
        <router-link v-if="link.route" :to="link.route">
            {{ link.text }}
        </router-link>
        <span v-if="typeof link.action === 'function'" @click="link.action">
            {{ link.text }}
        </span>
    </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import RoutesPaths from '@/router/routes';
import { useUserStore } from '@/stores/user';

type Links = {
    text: string;
    route?: (typeof RoutesPaths)[keyof typeof RoutesPaths];
    action?: () => void;
};

const userStore = useUserStore();
const router = useRouter();

const { isLoggedIn, loggedInUser } = storeToRefs(userStore);

const loggedOutLinks: Array<Links> = [
    {
        text: 'Login',
        route: RoutesPaths.Login,
    },
    {
        text: 'Register',
        route: RoutesPaths.Register,
    },
];

const loggedInLinks: Array<Links> = [
    {
        text: 'Jobs Board',
        route: RoutesPaths.Home,
    },
    {
        text: 'Your Jobs',
        route: RoutesPaths.UserJobs,
    },
    {
        text: 'Logout',
        action: () => {
            userStore.logout();
            redirectAfterLogout();
        },
    },
];

function redirectAfterLogout() {
    router.push(RoutesPaths.Home);
}

const activeLinks = computed(() => {
    if (isLoggedIn.value) {
        return loggedInLinks;
    } else {
        return loggedOutLinks;
    }
});
</script>
