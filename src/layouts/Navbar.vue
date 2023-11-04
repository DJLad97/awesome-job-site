<template>
    <nav
        class="navbar bg-neutral drop-shadow-md justify-between drawer drawer-end"
    >
        <input id="sidebar" type="checkbox" class="drawer-toggle" />
        <div>
            <router-link
                :to="Routes.Home"
                class="btn btn-ghost normal-case text-xl"
            >
                Awesome Job Site
            </router-link>
        </div>
        <ul class="sm:menu sm:menu-horizontal px-1 hidden">
            <nav-list />
        </ul>
        <label
            for="sidebar"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost sm:hidden"
        >
            <burger-menu />
        </label>
        <div class="drawer-side">
            <label
                for="sidebar"
                aria-label="close sidebar"
                class="drawer-overlay"
            ></label>

            <ul class="menu p-4 w-80 min-h-full bg-base-200">
                <li>
                    <label
                        for="sidebar"
                        aria-label="close sidebar"
                        class="btn btn-sm btn-sqaure btn-ghost self-end"
                    >
                        <cross />
                    </label>
                </li>
                <nav-list />
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import Routes from '@/router/routes';
import Cross from '@/components/icons/Cross.vue';
import BurgerMenu from '@/components/icons/BurgerMenu.vue';
import NavList from '@/components/NavList.vue';
</script>
