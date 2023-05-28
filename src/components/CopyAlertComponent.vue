<template>
  <v-slide-y-reverse-transition>
    <v-alert
      v-if="appStore.copyAlert == 'success'"
      class="copy_alert"
      type="success"
      title="Link copied to clipboard"
    />
    <v-alert
      v-else-if="appStore.copyAlert == 'error'"
      class="copy_alert"
      type="success"
      title="Copy to clipboard failed"
    />
  </v-slide-y-reverse-transition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<style scoped>
.copy_alert {
  position: fixed;
  left: 1.5rem;
  bottom: 1.5rem;
  max-width: calc(100svw - 3rem);
  z-index: 9999;
}
</style>
