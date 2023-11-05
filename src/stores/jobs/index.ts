import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { Job } from './types';

export const useJobsStore = defineStore(
    'jobs',
    () => {
        const jobs = ref<Array<Job>>([
            {
                id: 1,
                title: 'Frontend Web Developer',
                company: 'Company 1',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus eleifend erat, sit amet varius dolor tincidunt nec. In rutrum arcu in elementum scelerisque. Praesent fermentum diam eu felis imperdiet, sit amet condimentum velit imperdiet. Nulla facilisi. Morbi aliquet, eros vitae luctus faucibus, velit odio venenatis ex, id fermentum tellus tortor ut mi',
            },
            {
                id: 2,
                title: 'Backend Web Developer',
                company: 'Company 2',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus eleifend erat, sit amet varius dolor tincidunt nec. In rutrum arcu in elementum scelerisque. Praesent fermentum diam eu felis imperdiet, sit amet condimentum velit imperdiet. Nulla facilisi. Morbi aliquet, eros vitae luctus faucibus, velit odio venenatis ex, id fermentum tellus tortor ut mi',
            },
            {
                id: 3,
                title: 'Fullstack Web Developer',
                company: 'Company 3',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus eleifend erat, sit amet varius dolor tincidunt nec. In rutrum arcu in elementum scelerisque. Praesent fermentum diam eu felis imperdiet, sit amet condimentum velit imperdiet. Nulla facilisi. Morbi aliquet, eros vitae luctus faucibus, velit odio venenatis ex, id fermentum tellus tortor ut mi',
            },
        ]);

        const getJobById = computed(() => (id: number) => {
            return jobs.value.find((job) => job.id === id) ?? null;
        });

        return { jobs, getJobById };
    },
    {
        persist: true,
    }
);
