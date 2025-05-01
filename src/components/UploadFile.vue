<template>
    <div class="container-fluid d-flex flex-column align-items-center mt-5 shadow p-3 mb-3 bg-body-tertiary rounded">
        <div class="container d-flex align-items-center">
            <h5 class="fw-bold">Upload do arquivo de logs</h5>

            <div class="custom-file w-auto border-1 rounded-2 border py-2 px-3 m-3 text-center bg-primary text-white">
                <input type="file" class="custom-file-input d-none" id="inputGroupFile" @change="handleFileUpload" >
                <label class="custom-file-label fw-bold" for="inputGroupFile">Upload</label>
            </div>

            <h5>Quantidade de usuários: {{ userCount }}</h5>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import UserService from '@/services/UserService';

    const emits = defineEmits(['fileUploaded']);

    const userCount = ref(0);

    const handleFileUpload = async (event: Event) => {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const response = await UserService.uploadLogs(file);

            userCount.value = response.user_count;
            emits('fileUploaded', true);
        }
    };
</script>

<style scoped>
    .custom-file,
    .custom-file-label {
        cursor: pointer;
    }
</style>