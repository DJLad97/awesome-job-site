import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { User, UserJobs } from './types';

export const useUserStore = defineStore(
    'user',
    () => {
        const loggedInUser = ref<User | null>(null);
        const registeredUsers = ref<Array<User>>([
            {
                id: 1,
                name: 'Dan',
                email: 'dan@test.com',
                password: 'password1',
            },
            {
                id: 2,
                name: 'Dan2',
                email: 'dan2@test.com',
                password: 'password2',
            },
            {
                id: 3,
                name: 'Dan3',
                email: 'dan3@test.com',
                password: 'password3',
            },
            {
                id: 4,
                name: 'Dan4',
                email: 'dan4@test.com',
                password: 'password4',
            },
        ]);

        const userJobs = ref<Array<UserJobs>>([]);

        const isLoggedIn = computed(() => !!loggedInUser.value);

        const getUserJobsbyId = computed(() => (jobId: number) => {
            return (
                userJobs.value.find(
                    (userJob) =>
                        userJob.jobId === jobId &&
                        userJob.userId === loggedInUser.value?.id
                ) ?? null
            );
        });

        const getUserByEmail = computed(() => (email: string) => {
            return (
                registeredUsers.value.find((user) => user.email === email) ??
                null
            );
        });

        function logout() {
            loggedInUser.value = null;
        }

        return {
            // State
            loggedInUser,
            registeredUsers,
            userJobs,

            // Getters
            isLoggedIn,
            getUserJobsbyId,
            getUserByEmail,

            // Actions
            logout,
        };
    },
    {
        persist: true,
    }
);
