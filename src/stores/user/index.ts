import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { User } from './types';

export const useUserStore = defineStore(
    'user',
    () => {
        const loggedInUser = ref<User | null>(null);
        const validUsers = ref<Array<User>>([
            {
                name: 'Dan',
                email: 'dan@test.com',
                password: 'password1',
            },
            {
                name: 'Dan2',
                email: 'dan2@test.com',
                password: 'password2',
            },
            {
                name: 'Dan3',
                email: 'dan3@test.com',
                password: 'password3',
            },
            {
                name: 'Dan4',
                email: 'dan4@test.com',
                password: 'password4',
            },
        ]);

        const isLoggedIn = computed(() => !!loggedInUser.value);

        function logout() {
            loggedInUser.value = null;
        }

        return { loggedInUser, isLoggedIn, validUsers, logout };
    },
    {
        persist: true,
    }
);
