<template>
    <card>
        <template #title>Reset Password</template>
        <template #content>
            <error-box v-if="userFound === false">
                Something went wrong. Please try again
            </error-box>
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
                        <span class="label-text">New Password</span>
                    </label>
                    <text-input
                        v-model:input="newPassword"
                        type="newPassword"
                        name="newPassword"
                        id="newPassword"
                        :class="[isInvalid('newPassword') ? 'input-error' : '']"
                        :ariaInvalid="isInvalid('newPassword')"
                        ariaErrormessage="newPassword-error"
                    />
                    <error-message
                        v-if="isInvalid('newPassword')"
                        id="newPassword-error"
                    >
                        {{ v$.password.$errors[0].$message }}
                    </error-message>
                </div>

                <button class="btn btn-primary w-full mt-4" :disabled="loading">
                    <span
                        v-if="loading"
                        class="text-white loading loading-bars loading-xs"
                    ></span>
                    <span v-else>Reset</span>
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
import ErrorBox from '@/components/form/ErrorBox.vue';

const store = useUserStore();
const router = useRouter();

const { getUserByEmail } = storeToRefs(store);

const email = ref('');
const newPassword = ref('');
const loading = ref(false);
const userFound = ref<boolean | null>(null);

const rules = computed(() => ({
    email: {
        required: helpers.withMessage('Email is required', required),
        emailRule: helpers.withMessage('Please enter a valid email', emailRule),
    },
    newPassword: {
        required: helpers.withMessage('New Password is required', required),
    },
}));

const v$ = useVuelidate(rules, { email, newPassword });

async function submit() {
    const isFormValid = await v$.value.$validate();
    userFound.value = null;

    if (isFormValid) {
        let foundUser: User | null = null;
        loading.value = true;

        setTimeout(() => {
            foundUser = getUserByEmail.value(email.value);

            loading.value = false;

            if (foundUser) {
                foundUser.password = newPassword.value;
                router.push(RoutePaths.Login);
            } else {
                userFound.value = false;
            }
        }, 700);
    }
}

function isInvalid(value: 'email' | 'newPassword') {
    const errors = v$.value[value].$errors;

    return errors.length > 0;
}
</script>
