<template>
    <nav class="navbar bg-neutral drop-shadow-md justify-between">
        <div>
            <router-link
                :to="Routes.Home"
                class="btn btn-ghost normal-case text-xl"
            >
                Awesome Job Site
            </router-link>
        </div>
        <div>
            <ul class="menu menu-horizontal px-1">
                <li v-for="link in activeLinks">
                    <router-link v-if="link.route" :to="link.route">
                        {{ link.text }}
                    </router-link>
                    <span
                        v-if="typeof link.action === 'function'"
                        @click="link.action"
                    >
                        {{ link.text }}
                    </span>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import RoutesPaths from '@/router/routes';
import Routes from '@/router/routes';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

type Links = {
    text: string;
    route?: (typeof RoutesPaths)[keyof typeof RoutesPaths];
    action?: () => void;
};

const store = useUserStore();

const { isLoggedIn } = storeToRefs(store);

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
        route: RoutesPaths.Home,
    },
    {
        text: 'Logout',
        action: () => {
            isLoggedIn.value = false;
        },
    },
];

const activeLinks = computed(() => {
    if (isLoggedIn.value) {
        return loggedInLinks;
    } else {
        return loggedOutLinks;
    }
});
</script>
