<template>
    <div class="dashboard">

        <label for="inputFile">Adicione o arquivo de logs</label>
        <input type="file" id="inputFile" @change="handleFileUpload" />

        <div class="dashboard__container">
            <div class="dashboard__container__item">
                <h2>Usuários</h2>
                <p>{{ uploadLogs.user_count }}</p>
            </div>
            <div class="dashboard__container__item">
                <h2>Tempo execução serviço</h2>
                <p>{{ uploadLogs.execution_time_ms }}</p>
            </div>

            <div class="dashboard__container--superusers">
                <h2>Super Usuários</h2>
                <p>Super usuários são aqueles que estão ativos e que possuem mais de 900 pontos.</p>

                <button @click="getSuperUsers()">Buscar Super Usuários</button>
                <h2>Usuários</h2>
                <p>{{ superUsers.user_count }}</p>
                <h2>Tempo execução serviço</h2>
                <p>{{ superUsers.execution_time_ms }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import UserService from '../services/UserService';

    const uploadLogs = ref({
        user_count: ref(0),
        execution_time_ms: ref(0),
    });

    const superUsers = ref({
        user_count: ref(0),
        execution_time_ms: ref(0),
    });

    const handleFileUpload = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const response = await UserService.uploadLogs(file);

            uploadLogs.value.user_count = response.user_count;
            uploadLogs.value.execution_time_ms = response.execution_time_ms;
        }
    };

    const getSuperUsers = async () => {
        const response = await UserService.getSuperUsers();

        superUsers.value.user_count = response.user_count;
        superUsers.value.execution_time_ms = response.execution_time_ms;
    };
</script>

<style scoped>

</style>
