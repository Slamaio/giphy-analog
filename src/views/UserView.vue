<template>
  <AppBarComponent />
  <v-main>
    <v-container fluid>
      <GoBackButtonVue block />
      <v-row class="align-center">
        <v-col cols="auto">
          <v-img :src="user?.avatar_url" width="100" height="100" />
        </v-col>
        <v-col>
          <h1>{{ user?.username }}</h1>
          <p>
            <a :href="user?.profile_url" target="_blank">{{ user?.profile_url }}</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { IUser } from 'env'
import { useAppStore } from '@/stores/app'
import AppBarComponent from '@/components/AppBarComponent.vue'
import GoBackButtonVue from '@/components/GoBackButton.vue'

const appStore = useAppStore()

const user = ref<IUser>()

onBeforeMount(() => {
  user.value = appStore.user
})
</script>
