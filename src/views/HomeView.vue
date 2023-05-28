<template>
  <v-main>
    <v-container fluid>
      <div class="text-center mb-2">
        <v-pagination v-model="page" :length="pagesCount" />
      </div>

      <v-row>
        <transition-group name="gif-transition">
          <v-col v-for="gif in gifs" :key="gif.id" cols="12" sm="6" md="4" lg="3">
            <GifCard :gif="gif" shareable :to="/gifs/ + gif.id" />
          </v-col>
        </transition-group>
      </v-row>

      <div class="text-center mt-2">
        <v-pagination v-model="page" :length="pagesCount" />
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import type { IGif } from 'env'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import giphy, { type IGiphy } from '@/api/giphy'
import GifCard from '@/components/GifCardComponent.vue'

const appStore = useAppStore()

const gifs = ref<IGif[]>([])
const totalCount = ref(0)
const limit = ref(20)
const offset = ref(0)
const { page } = storeToRefs(appStore)
const { searchQuery } = storeToRefs(appStore)
const pagesCount = computed(() => Math.floor(totalCount.value / limit.value))

watch(
  page,
  async (newPage, oldPage) => {
    if (newPage != oldPage) {
      offset.value = limit.value * (page.value - 1)
      await fetchGifs()
    }
  },
  { immediate: true },
)

watch(
  searchQuery,
  async (newQuery, oldQuery) => {
    if (oldQuery || newQuery != '') {
      page.value = 1
      offset.value = 0

      await fetchGifs()
    }
  },
  { immediate: true },
)

async function fetchGifs() {
  const res = searchQuery.value
    ? ((await giphy.searchGifs(searchQuery.value, limit.value, offset.value)) as IGiphy)
    : ((await giphy.fetchTrendingGifs(limit.value, offset.value)) as IGiphy)

  // Hack to fix card positioning artifacts during transition animation
  gifs.value = []
  setTimeout(() => {
    gifs.value = res.gifs
  }, 500) // timeout must be equal to the transition time
  totalCount.value = res.totalCount

  console.log(totalCount.value)
}
</script>

<style scoped>
.gif-transition-enter-active,
.gif-transition-leave-active {
  transition: opacity 0.5s;
  transition: transform 0.5s;
}

.gif-transition-enter,
.gif-transition-leave-to {
  opacity: 0.2;
  transform: translatex(-100vw);
}
</style>
