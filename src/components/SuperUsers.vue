<template>
    <div class="container-fluid d-flex flex-column align-items-center mt-3 shadow p-3 mb-5 bg-body-tertiary rounded text-start super-users">
        <h4 class="fw-bold mb-1">Super Usuários</h4>
        <p class="mb-3">Super usuários são aqueles que estão ativos e que possuem mais de 950 pontos.</p>

        <button class="btn btn-primary py-2 p-3 mb-3" @click="getSuperUsers()" :disabled="!hasFile">Buscar Super Usuários</button>

        <table class="table table-striped table-bordered table-hover table-responsive">
            <caption class="p-1 fs-6">Lista de Super Usuários</caption>
            <colgroup>
                <col style="width: 30%"/>
                <col style="width: 25%"/>
                <col style="width: 25%"/>
                <col style="width: 25%"/>
            </colgroup>
            <thead>
                <tr>
                    <th class="bg-secondary-subtle p-3">Nome</th>
                    <th class="bg-secondary-subtle p-3">Idade</th>
                    <th class="bg-secondary-subtle p-3">Pontuação</th>
                    <th class="bg-secondary-subtle p-3">País</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in superUsers" :key="user.name">
                    <td class="p-3">{{ user.name }}</td>
                    <td class="p-3">{{ user.age }}</td>
                    <td class="p-3">{{ user.score }}</td>
                    <td class="p-3">{{ user.country }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import { User } from '@/model/User';

    import UserService from '@/services/UserService';

    defineProps({
        hasFile: {
            type: Boolean,
            default: false
        }
    });

    const superUsers = ref<User[]>([]);

    const getSuperUsers = async () => {
        const response = await UserService.getSuperUsers();

        const responseData = response.data as User[];
        const list = responseData.map((user: any) => new User(
            user.nome,
            user.idade,
            user.score,
            user.pais
        ));
        list.sort((a, b) => b.score - a.score);
        superUsers.value = list;
    };

</script>

<style scoped>
    .super-users {
        height: 400px;
        max-height: 400px;
        overflow-y: auto;
    }
</style>