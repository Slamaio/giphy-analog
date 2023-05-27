<template>
  <v-app-bar flat class="pa-2">
    <v-row class="align-center">
      <v-col cols="3"><v-img src="src/assets/giphy-logo--1320x282.png" height="64" /></v-col>
      <v-col cols="9">
        <v-text-field
          v-model="searchQuery"
          label="Search"
          variant="outlined"
          single-line
          hide-details
          @input="debounceSearch"
        />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  (event: 'update', value: string): void
}>()

function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

const debounceSearch = debounce(function () {
  emit('update', searchQuery.value)
}, 500)
</script>
