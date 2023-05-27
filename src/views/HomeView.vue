<template>
  <v-main>
    <v-container fluid>
      <v-infinite-scroll :items="gifs" :onLoad="loadMore">
        <v-row>
          <template v-for="gif in gifs" :key="gif.id">
            <v-col cols="3">
              <GifCardComponent :gif="gif" />
            </v-col>
          </template>
        </v-row>
      </v-infinite-scroll>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import giphy from '@/api/giphy'
import type { IGif } from 'env'
import GifCardComponent from '@/components/GifCardComponent.vue'
import { onMounted, ref } from 'vue'
import { VInfiniteScroll } from 'vuetify/labs/components'

const gifs = ref<IGif[]>([])
const limit = ref(20)
const offset = ref(0)

onMounted(async () => {
  gifs.value = await fetchTrendingGifs()
})

async function fetchTrendingGifs() {
  const trendingGifs = (await giphy.fetchTrendingGifs(limit.value, offset.value)) as IGif[]
  return trendingGifs
}

async function loadMore(load: {
  side: 'end' | 'start' | 'both'
  done: (status: 'error' | 'loading' | 'empty' | 'ok') => void
}) {
  offset.value += limit.value

  const trendingGifs = await fetchTrendingGifs()
  gifs.value = [...gifs.value, ...trendingGifs]
  load.done('ok')
}
</script>
