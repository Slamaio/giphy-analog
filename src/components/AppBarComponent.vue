<template>
  <v-app-bar flat class="px-4" color="background">
    <v-row class="align-center">
      <v-col cols="3" md="2" offset-md="1" lg="2" offset-lg="2" xl="1" offset-xl="3">
        <router-link to="/">
          <v-img src="@/assets/logo.svg" height="35" />
        </router-link>
      </v-col>
      <v-col cols="9" md="8" lg="6" xl="5">
        <v-form @submit.prevent="onCLick">
          <v-text-field
            v-model="searchQuery"
            label="Search"
            variant="outlined"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            flat
            @input="debounceSearch"
            @click:append-inner="onCLick"
          />
        </v-form>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '@/utils'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

const searchQuery = ref('')

const debounceSearch = debounce(function () {
  appStore.searchQuery = searchQuery.value
}, 500)

function onCLick() {
  router.push('/')
}
</script>
