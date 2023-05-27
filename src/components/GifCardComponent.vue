<template>
  <v-card>
    <v-img :src="gif.images.downsized.url" />
  </v-card>
</template>

<script setup lang="ts">
import type { IGif } from 'env'

defineProps<{
  gif: IGif
}>()
</script>
