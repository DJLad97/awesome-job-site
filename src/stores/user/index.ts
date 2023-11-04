import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserLogin } from './types';

export const useUserStore = defineStore(
    'user',
    () => {
        const isLoggedIn = ref(false);
        const validUsers = ref<Array<UserLogin>>([
            {
                email: 'dan@test.com',
                password: 'password1',
            },
            {
                email: 'dan2@test.com',
                password: 'password2',
            },
            {
                email: 'dan3@test.com',
                password: 'password3',
            },
            {
                email: 'dan4@test.com',
                password: 'password4',
            },
        ]);

        return { isLoggedIn, validUsers };
    },
    {
        persist: true,
    }
);
