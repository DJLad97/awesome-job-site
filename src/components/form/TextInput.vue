<template>
    <input
        v-model="input"
        :type="type"
        class="input input-bordered w-full max-w-xs"
        :name="name"
        :id="id"
        :aria-invalid="ariaInvalid"
        aria-errormessage="ariaErrormessage"
    />
</template>

<script lang="ts" setup>
import { defineModel } from 'vue';
type Props = {
    id: string;
    name: string;
    type?: string;
    ariaInvalid?: boolean;
    ariaErrormessage: string;
};

withDefaults(defineProps<Props>(), {
    type: 'text',
    ariaInvalid: false,
});

const input = defineModel<string>('input', {
    required: true,
});
</script>
