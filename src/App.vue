<script setup lang="ts">
import Navbar from '@/layouts/Navbar.vue';
import Content from '@/layouts/Content.vue';
</script>

<template>
    <navbar />
    <content>
        <router-view></router-view>
    </content>
</template>
