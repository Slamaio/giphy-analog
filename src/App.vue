<template>
  <v-app>
    <AppBar />
    <RouterView />
    <CopyAlert />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import CopyAlert from '@/components/CopyAlertComponent.vue'
import AppBar from '@/components/AppBarComponent.vue'
</script>
