<template>
    <card>
        <template #title>Register</template>
        <template #content>
            <form @submit.prevent="submit">
                <div class="form-control w-full max-w-xs">
                    <label for="name" class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <text-input
                        v-model:input="name"
                        name="name"
                        id="name"
                        :class="[isInvalid('name') ? 'input-error' : '']"
                        :ariaInvalid="isInvalid('name')"
                        ariaErrormessage="name-error"
                    />
                    <error-message
                        v-if="isInvalid('name')"
                        id="name-error"
                        class="text-error text-xs pt-1 pl-1"
                    >
                        {{ v$.name.$errors[0].$message }}
                    </error-message>
                </div>
                <div class="form-control w-full max-w-xs">
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
                <div class="form-control w-full max-w-xs">
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
                <div class="form-control w-full max-w-xs">
                    <label for="password" class="label">
                        <span class="label-text">Confirm Password</span>
                    </label>
                    <text-input
                        v-model:input="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        :class="[
                            isInvalid('confirmPassword') ? 'input-error' : '',
                        ]"
                        :ariaInvalid="isInvalid('confirmPassword')"
                        ariaErrormessage="confirmPassword-error"
                    />
                    <error-message
                        v-if="isInvalid('confirmPassword')"
                        id="confirmPassword-error"
                    >
                        {{ v$.confirmPassword.$errors[0].$message }}
                    </error-message>
                </div>

                <button class="btn btn-primary w-full mt-4" :disabled="loading">
                    <span
                        v-if="loading"
                        class="text-white loading loading-bars loading-xs"
                    ></span>
                    <span v-else>Register</span>
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
import {
    required,
    email as emailRule,
    helpers,
    sameAs,
} from '@vuelidate/validators';
import { useUserStore } from '@/stores/user';
import RoutePaths from '@/router/routes';
import TextInput from '@/components/form/TextInput.vue';
import ErrorMessage from '@/components/form/ErrorMessage.vue';
import Card from '@/components/Card.vue';

const store = useUserStore();
const router = useRouter();

const { validUsers, loggedInUser } = storeToRefs(store);

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const rules = computed(() => ({
    name: {
        required: helpers.withMessage('Name is required', required),
    },
    email: {
        required: helpers.withMessage('Email is required', required),
        emailRule: helpers.withMessage('Please enter a valid email', emailRule),
        unique: helpers.withMessage('Email already taken', (value: string) =>
            isUniqueEmail(value)
        ),
    },
    password: {
        required: helpers.withMessage('Password is required', required),
    },
    confirmPassword: {
        required: helpers.withMessage(
            'Password confirmation is required',
            required
        ),
        sameAsPassword: helpers.withMessage(
            'Passwords must match',
            sameAs(password.value)
        ),
    },
}));

const v$ = useVuelidate(rules, { name, email, password, confirmPassword });

async function submit() {
    const isFormValid = await v$.value.$validate();

    if (isFormValid) {
        loading.value = true;

        setTimeout(() => {
            loading.value = false;
            const newUserId =
                validUsers.value[validUsers.value.length - 1].id + 1;

            const user = {
                id: newUserId,
                name: name.value,
                email: email.value,
                password: password.value,
            };

            validUsers.value.push(user);

            loggedInUser.value = user;

            router.push(RoutePaths.Home);
        }, 700);
    }
}

function isInvalid(value: 'name' | 'email' | 'password' | 'confirmPassword') {
    const errors = v$.value[value].$errors;

    return errors.length > 0;
}

function isUniqueEmail(value: string) {
    return !!!validUsers.value.find((user) => user.email === value);
}
</script>
