<template>
  <v-app-bar flat class="px-2" color="background">
    <v-row class="align-center justify-center">
      <v-col :cols="search ? 3 : 12">
        <router-link to="/">
          <v-img src="@/assets/logo.svg" height="35" />
        </router-link>
      </v-col>
      <v-col cols="9" v-if="search">
        <v-text-field
          v-model="searchQuery"
          label="Search"
          variant="outlined"
          single-line
          hide-details
          flat
          @input="debounceSearch"
        />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '@/utils'

defineProps<{
  search?: boolean
}>()

const searchQuery = ref('')

const emit = defineEmits<{
  (event: 'update', value: string): void
}>()

const debounceSearch = debounce(function () {
  emit('update', searchQuery.value)
}, 500)
</script>
