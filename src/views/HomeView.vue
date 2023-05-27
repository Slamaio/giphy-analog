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
        <transition-group name="gif-transition">
          <v-col v-for="gif in gifs" :key="gif.id" cols="12" sm="6" md="4" lg="3">
            <GifCardComponent :gif="gif" :to="/gifs/ + gif.id" shareable />
          </v-col>
        </transition-group>
      </v-row>

      <div class="text-center">
        <v-pagination v-model="page" :length="totalCount / limit" />
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import type { IGif } from 'env'
import { watch, ref } from 'vue'
import giphy, { type IGiphy } from '@/api/giphy'
import GifCardComponent from '@/components/GifCardComponent.vue'
import AppBarComponent from '@/components/AppBarComponent.vue'

const page = ref(1)
const gifs = ref<IGif[]>([])
const totalCount = ref(0)
const limit = ref(20)
const offset = ref(0)
const query = ref('')

watch(
  page,
  async () => {
    offset.value = limit.value * (page.value - 1)
    await fetchGifs()
  },
  { immediate: true },
)

watch(
  query,
  async () => {
    page.value = 1
    offset.value = 0
    await fetchGifs()
  },
  { immediate: true },
)

async function fetchGifs() {
  const res = query.value
    ? ((await giphy.searchGifs(query.value, limit.value, offset.value)) as IGiphy)
    : ((await giphy.fetchTrendingGifs(limit.value, offset.value)) as IGiphy)

  gifs.value = res.gifs
  totalCount.value = res.total_count

  console.log(totalCount.value)
}
</script>

<style scoped>
.gif-transition-enter-active,
.gif-transition-leave-active {
  transition: opacity 0.5s;
}

.gif-transition-enter,
.gif-transition-leave-to {
  opacity: 0;
}
</style>
