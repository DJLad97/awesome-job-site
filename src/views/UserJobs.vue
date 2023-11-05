<template>
    <div class="container flex flex-col sm:w-1/2 w-3/4">
        <h1 class="text-center py-4">Your Jobs</h1>
        <jobs-list v-if="hasAppliedJobs()" :jobs="appliedJobs" />
        <h2 v-else>You haven't applied for any jobs</h2>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';
import JobsList from '@/components/JobsList.vue';
import { Job } from '@/stores/jobs/types';
const jobStore = useJobsStore();
const userStore = useUserStore();

const { getJobById } = storeToRefs(jobStore);
const { getJobsForCurrentUser } = storeToRefs(userStore);
const appliedJobs = ref<Array<Job>>([]);

onMounted(() => {
    if (hasAppliedJobs()) {
        getJobsForCurrentUser.value.forEach((userJob) => {
            const job = getJobById.value(userJob.jobId);

            if (job) {
                appliedJobs.value.push(job);
            }
        });
    }
});

function hasAppliedJobs() {
    return getJobsForCurrentUser.value.length > 0;
}
</script>
