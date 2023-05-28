<template>
  <v-main>
    <v-container fluid>
      <GoBackButton block />
      <v-row>
        <v-col cols="auto" class="mx-auto d-flex flex-column align-center">
          <v-img :src="user?.avatar_url" max-width="250" max-height="250" />
          <h1>{{ user?.display_name }}</h1>
          <h2>@{{ user?.username }}</h2>
          <a :href="user?.profile_url" target="_blank">{{ user?.profile_url }}</a>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { IUser } from 'env'
import { useAppStore } from '@/stores/app'
import GoBackButton from '@/components/GoBackButtonComponent.vue'

const appStore = useAppStore()

const user = ref<IUser>()

onBeforeMount(() => {
  user.value = appStore.user
})
</script>
