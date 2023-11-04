<template>
    <div
        class="card bg-neutral text-neutral-content drop-shadow-xl sm:w-96 w-full mx-4"
    >
        <div class="card-body">
            <h1 class="text-center">
                <slot name="title" />
            </h1>
            <slot name="content" />
        </div>
    </div>
</template>
