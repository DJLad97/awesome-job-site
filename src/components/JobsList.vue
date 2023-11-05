<template>
    <div
        v-for="job in jobs"
        :key="job.id"
        class="collapse collapse-arrow bg-base-200 w-fit my-4"
    >
        <input type="radio" name="job" />
        <div
            class="collapse-title text-xl font-medium"
            :aria-describedby="`job-title-${job.id}`"
        >
            <span :id="`job-title-${job.id}`">{{ job.title }}</span>
            <span class="block text-xs text-accent">{{ job.company }} </span>
        </div>
        <div class="collapse-content">
            {{ job.description }}
            <button
                type="button"
                class="mt-4 block btn btn-primary btn-sm"
                @click="goToJob(job.id)"
            >
                <span v-if="!getUserJobsbyId(job.id)">Apply</span>
                <span v-else>View Job</span>
            </button>
            <p v-if="getUserJobsbyId(job.id)" class="font-bold mt-4">Applied</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import RoutesPaths from '@/router/routes';
import { Job } from '@/stores/jobs/types';

const router = useRouter();
const userStore = useUserStore();

defineProps<{
    jobs: Array<Job>;
}>();

const { getUserJobsbyId } = storeToRefs(userStore);

function goToJob(id: number) {
    router.push(`${RoutesPaths.Job}/${id}`);
}
</script>
