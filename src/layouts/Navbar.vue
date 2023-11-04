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
                <li>
                    <router-link :to="Routes.Login">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import Routes from '@/router/routes';
</script>
