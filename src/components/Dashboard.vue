<template>
    <div class="container-fluid d-flex flex-column p-5 text-center bg-secondary-subtle">
        <h2 class="fw-bold">Análise de logs - Dashboard</h2>

        <upload-file
            @fileUploaded="hasFile = $event"
        />
        <super-users
            :hasFile="hasFile"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import UploadFile from '@/components/UploadFile.vue';
    import SuperUsers from '@/components/SuperUsers.vue';

    const hasFile = ref(false);
</script>

<style scoped>

</style>
