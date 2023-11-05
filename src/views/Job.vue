<template>
    <div class="sm:w-1/2 w-3/4">
        <button
            type="button"
            class="btn btn-primary btn-sm align-middle"
            @click="back"
        >
            Back
        </button>
        <div v-if="job">
            <h1 class="text-5xl font-bold pt-4">{{ job.title }}</h1>
            <h2 class="pt-4">{{ job.company }}</h2>
            <p class="pt-4 text-sm">{{ job.description }}</p>
            <div class="py-6"></div>
            <h2 class="text-4xl pb-4">Apply</h2>

            <div class="divide-primary" />
            <form v-if="!applied" @submit.prevent="submit">
                <div class="form-control w-full">
                    <label for="name" class="label">
                        <span class="label-text">Name *</span>
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
                <div class="form-control w-full">
                    <label for="email" class="label">
                        <span class="label-text">Email *</span>
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
                    <label for="phoneNumber" class="label">
                        <span class="label-text">Phone Number *</span>
                    </label>
                    <text-input
                        v-model:input="phoneNumber"
                        name="phoneNumber"
                        id="phoneNumber"
                        :class="[isInvalid('phoneNumber') ? 'input-error' : '']"
                        :ariaInvalid="isInvalid('phoneNumber')"
                        ariaErrormessage="phoneNumber-error"
                    />
                    <error-message
                        v-if="isInvalid('phoneNumber')"
                        id="phoneNumber-error"
                    >
                        {{ v$.phoneNumber.$errors[0].$message }}
                    </error-message>
                </div>
                <div class="form-control w-full">
                    <label for="coverLetter" class="label">
                        <span class="label-text">Cover Letter</span>
                    </label>
                    <textarea
                        class="textarea textarea-bordered"
                        v-model="coverLetter"
                        type="textarea"
                        name="coverLetter"
                        id="coverLetter"
                        :class="[isInvalid('coverLetter') ? 'input-error' : '']"
                        :aria-invalid="isInvalid('coverLetter')"
                        aria-errormessage="coverLetter-error"
                    />
                    <error-message
                        v-if="isInvalid('coverLetter')"
                        id="coverLetter-error"
                    >
                        {{ v$.coverLetter.$errors[0].$message }}
                    </error-message>
                </div>
                <div class="form-control w-full">
                    <label for="cv" class="label">
                        <span class="label-text">CV *</span>
                    </label>
                    <input
                        type="file"
                        class="file-input file-input-bordered file-input-primary w-full"
                        @change="cvUpload($event)"
                        accept="application/pdf"
                        name="cv"
                        id="cv"
                        :class="[isInvalid('cv') ? 'input-error' : '']"
                        :aria-invalid="isInvalid('cv')"
                        aria-errormessage="cv-error"
                    />
                    <error-message v-if="isInvalid('cv')" id="cv-error">
                        {{ v$.cv.$errors[0].$message }}
                    </error-message>
                </div>

                <button
                    v-if="isLoggedIn"
                    class="btn btn-primary w-full mt-4"
                    :disabled="loading"
                >
                    <span
                        v-if="loading"
                        class="text-white loading loading-bars loading-xs"
                    ></span>
                    <span v-else>Apply</span>
                </button>
                <button
                    type="button"
                    v-else
                    class="btn btn-warning w-full mt-4"
                    @click="goToLogin"
                >
                    <span>Please log in to apply</span>
                </button>
            </form>
            <div v-else>
                <p>Application sent</p>
            </div>
        </div>
        <div v-else>
            <h1 class="text-5xl font-bold pt-4">Job not found</h1>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import {
    required,
    email as emailRule,
    minLength,
    numeric,
    helpers,
} from '@vuelidate/validators';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';
import { Job } from '@/stores/jobs/types';
import TextInput from '@/components/form/TextInput.vue';
import ErrorMessage from '@/components/form/ErrorMessage.vue';
import RoutesPaths from '@/router/routes';

const jobStore = useJobsStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const { getJobById } = storeToRefs(jobStore);
const { loggedInUser, isLoggedIn, userJobs, getUserJobsbyId } =
    storeToRefs(userStore);

const job: Job | null = getJobById.value(Number(route.params.id));

const name = ref(loggedInUser.value?.name ?? '');
const email = ref(loggedInUser.value?.email ?? '');
const phoneNumber = ref('');
const coverLetter = ref('');
const cv = ref('');
const loading = ref(false);
const applied = ref(false);

onMounted(() => {
    if (job) {
        applied.value = !!getUserJobsbyId.value(job.id);
    }
});

const rules = computed(() => ({
    name: {
        required: helpers.withMessage('Name is required', required),
    },
    email: {
        required: helpers.withMessage('Email is required', required),
        emailRule: helpers.withMessage('Please enter a valid email', emailRule),
    },
    phoneNumber: {
        required: helpers.withMessage('Phone number is required', required),
        numeric: helpers.withMessage(
            'Phone number must only contain numbers',
            numeric
        ),
    },
    coverLetter: {
        minLength: helpers.withMessage(
            'Cover letter must be at least 120 characters',
            minLength(120)
        ),
    },
    cv: {
        required: helpers.withMessage('CV is required', required),
    },
}));

const v$ = useVuelidate(rules, { name, email, phoneNumber, coverLetter, cv });

async function submit() {
    const isFormValid = await v$.value.$validate();

    if (isFormValid && job) {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
            if (loggedInUser.value) {
                userJobs.value.push({
                    userId: loggedInUser.value?.id,
                    jobId: job.id,
                    name: name.value,
                    email: email.value,
                    phoneNumber: phoneNumber.value,
                    coverLetter: coverLetter.value ?? null,
                    cv: cv.value,
                });
                applied.value = true;
            }
        }, 700);
    }
}

function cvUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            cv.value = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}

function isInvalid(
    value: 'name' | 'email' | 'phoneNumber' | 'coverLetter' | 'cv'
) {
    const errors = v$.value[value].$errors;
    return errors.length > 0;
}

function goToLogin() {
    router.push(RoutesPaths.Login);
}

function back() {
    router.back();
}
</script>
