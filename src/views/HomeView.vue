<template>
  <AppBarComponent
    @update="
      (value) => {
        query = value
      }
    "
  />
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col v-for="gif in gifs" :key="gif.id" cols="3">
          <GifCardComponent :gif="gif" />
        </v-col>
      </v-row>

      <div class="text-center">
        <v-pagination v-model="page" :length="15" :total-visible="7" />
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import type { IGif } from 'env'
import { watch, ref } from 'vue'
import giphy from '@/api/giphy'
import GifCardComponent from '@/components/GifCardComponent.vue'
import AppBarComponent from '@/components/AppBarComponent.vue'

const page = ref(1)
const gifs = ref<IGif[]>([])
const limit = ref(20)
const offset = ref(0)
const query = ref('')

watch(
  page,
  async () => {
    offset.value = limit.value * page.value
    gifs.value = await fetchTrendingGifs()
  },
  { immediate: true },
)

async function fetchTrendingGifs() {
  const trendingGifs = (await giphy.fetchTrendingGifs(limit.value, offset.value)) as IGif[]
  return trendingGifs
}
</script>
