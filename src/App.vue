<template>
  <v-app>
    <AppBar />
    <v-row no-gutters>
      <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2" xl="6" offset-xl="3">
        <RouterView />
      </v-col>
    </v-row>
    <CopyAlert />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import CopyAlert from '@/components/CopyAlertComponent.vue'
import AppBar from '@/components/AppBarComponent.vue'
</script>
