<template>
  <v-app-bar flat>
    <v-row class="align-center">
      <v-col cols="3">
        <router-link to="/">
          <v-img src="@/assets/logo.svg" />
        </router-link>
      </v-col>
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
import { debounce } from '@/utils'

const searchQuery = ref('')

const emit = defineEmits<{
  (event: 'update', value: string): void
}>()

const debounceSearch = debounce(function () {
  emit('update', searchQuery.value)
}, 500)
</script>
