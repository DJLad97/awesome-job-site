<template>
    <div class="container flex flex-col sm:w-1/2 w-3/4">
        <h1 class="text-center py-4">Current Jobs Available</h1>
        <jobs-list :jobs="jobs" />
    </div>
</template>

<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobs';
import { storeToRefs } from 'pinia';
import JobsList from '@/components/JobsList.vue';

const jobStore = useJobsStore();

const { jobs } = storeToRefs(jobStore);
</script>
