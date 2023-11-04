<template>
    <card>
        <template #title>Login</template>
        <template #content>
            <p
                v-if="userFound === false"
                class="text-error bg-error/30 border border-error rounded p-2"
            >
                Invalid email or password
            </p>
            <form @submit.prevent="submit">
                <div class="form-control w-full">
                    <label for="email" class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <text-input
                        v-model:input="email"
                        name="email"
                        id="email"
                        :class="[isInvalid('email') ? 'input-error' : '']"
                        :ariaInvalid="isInvalid('email')"
                        ariaErrormessage="email-error"
                    />
                    <error-message
                        v-if="isInvalid('email')"
                        id="email-error"
                        class="text-error text-xs pt-1 pl-1"
                    >
                        {{ v$.email.$errors[0].$message }}
                    </error-message>
                </div>
                <div class="form-control w-full">
                    <label for="password" class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <text-input
                        v-model:input="password"
                        type="password"
                        name="password"
                        id="password"
                        :class="[isInvalid('password') ? 'input-error' : '']"
                        :ariaInvalid="isInvalid('password')"
                        ariaErrormessage="password-error"
                    />
                    <error-message
                        v-if="isInvalid('password')"
                        id="password-error"
                    >
                        {{ v$.password.$errors[0].$message }}
                    </error-message>
                </div>

                <button class="btn btn-primary w-full mt-4" :disabled="loading">
                    <span
                        v-if="loading"
                        class="text-white loading loading-bars loading-xs"
                    ></span>
                    <span v-else>Login</span>
                </button>
            </form>
        </template>
    </card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailRule, helpers } from '@vuelidate/validators';
import { useUserStore } from '@/stores/user';
import RoutePaths from '@/router/routes';
import TextInput from '@/components/form/TextInput.vue';
import ErrorMessage from '@/components/form/ErrorMessage.vue';
import Card from '@/components/Card.vue';
import { User } from '@/stores/user/types';

const store = useUserStore();
const router = useRouter();

const { validUsers, loggedInUser } = storeToRefs(store);

const email = ref('');
const password = ref('');
const loading = ref(false);
const userFound = ref<boolean | null>(null);

const rules = computed(() => ({
    email: {
        required: helpers.withMessage('Email is required', required),
        emailRule: helpers.withMessage('Please enter a valid email', emailRule),
    },
    password: {
        required: helpers.withMessage('Password is required', required),
    },
}));

const v$ = useVuelidate(rules, { email, password });

async function submit() {
    const isFormValid = await v$.value.$validate();
    userFound.value = null;

    if (isFormValid) {
        const user = {
            email: email.value,
            password: password.value,
        };

        let foundUser: User | null = null;
        loading.value = true;

        setTimeout(() => {
            foundUser =
                validUsers.value.find((validUser: User) => {
                    const userWithoutName = {
                        email: validUser.email,
                        password: validUser.password,
                    };
                    return (
                        JSON.stringify(userWithoutName) === JSON.stringify(user)
                    );
                }) ?? null;

            loading.value = false;

            if (foundUser) {
                loggedInUser.value = foundUser;
                if (router.options.history.state.back) {
                    router.back();
                } else {
                    router.push(RoutePaths.Home);
                }
            } else {
                userFound.value = false;
            }
        }, 700);
    }
}

function isInvalid(value: 'email' | 'password') {
    const errors = v$.value[value].$errors;

    return errors.length > 0;
}
</script>
