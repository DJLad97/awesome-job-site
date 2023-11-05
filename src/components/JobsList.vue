<template>
    <div class="form-control">
        <div class="input-group">
            <input
                v-model="searchValue"
                id="job-search"
                name="job-search"
                type="text"
                placeholder="Search…"
                class="input input-bordered w-full"
            />
            <button class="btn btn-square">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </div>
    </div>
    <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="collapse collapse-arrow bg-base-200 w-fit my-4"
    >
        <input
            type="checkbox"
            :id="`job-${job.id}`"
            :name="`job-${job.id}`"
            :aria-label="job.title"
            :aria-describedby="`job-description-${job.id}`"
            aria-role="accordion"
        />
        <div
            class="collapse-title text-xl font-medium"
            :aria-describedby="`job-title-${job.id}`"
        >
            <span :id="`job-title-${job.id}`">{{ job.title }}</span>
            <span class="block text-xs text-accent">{{ job.company }} </span>
        </div>
        <div class="collapse-content">
            <span :id="`job-description-${job.id}`">{{ job.description }}</span>
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
import { computed, ref } from 'vue';

const router = useRouter();
const userStore = useUserStore();

const props = defineProps<{
    jobs: Array<Job>;
}>();

const { getUserJobsbyId } = storeToRefs(userStore);

const searchValue = ref('');
const filteredJobs = computed(() => {
    const filteredJobs = props.jobs.filter((job) => {
        return job.title
            .toLowerCase()
            .includes(searchValue.value.toLowerCase());
    });

    console.log(filteredJobs);

    return filteredJobs.length > 0 ? filteredJobs : props.jobs;
});

function goToJob(id: number) {
    router.push(`${RoutesPaths.Job}/${id}`);
}
</script>
