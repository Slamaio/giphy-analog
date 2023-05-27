<template>
  <AppBarComponent />
  <v-main>
    <v-container fluid>
      <GoBackButtonVue block />
      <v-card v-if="gif?.id" class="bg-background" flat>
        <v-card-title class="px-0 text-wrap">
          {{ gif?.title }}
        </v-card-title>

        <v-card-text class="px-0">
          <GifCardComponent :gif="gif" original shareable />
          <p>
            Added by:
            <router-link v-if="gif?.user" to="/user">{{ gif?.user?.username }}</router-link>
            <span v-else>Anonym</span>
          </p>
        </v-card-text>
      </v-card>

      <v-alert
        v-else
        class="mx-auto my-5"
        type="error"
        title="Error!"
        text="Gif not found."
        max-width="300"
      />

      <v-slide-group v-model="model" show-arrows center-active>
        <v-slide-group-item v-for="randomGif in randomGifs" :key="randomGif.id">
          <GifCardComponent class="mx-4" :gif="randomGif" :to="/gifs/ + randomGif.id" />
        </v-slide-group-item>
      </v-slide-group>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { IGif } from 'env'
import giphy from '@/api/giphy'
import { useAppStore } from '@/stores/app'
import GifCardComponent from '@/components/GifCardComponent.vue'
import AppBarComponent from '@/components/AppBarComponent.vue'
import GoBackButtonVue from '@/components/GoBackButton.vue'

const route = useRoute()
const appStore = useAppStore()

const model = ref(null)
const gif = ref<IGif>({
  id: '1',
  url: '',
  title: '',
  images: {
    original: { url: '' },
    original_still: { url: '' },
    fixed_height: { url: '' },
    fixed_height_still: { url: '' },
  },
} as IGif)
const randomGifs = ref<IGif[]>([])

watch(
  () => route.params.gifId,
  async (newValue) => {
    gif.value = (await giphy.fetchGifById(newValue as string)) as IGif
    appStore.user = gif.value.user
  },
  { immediate: true },
)

onBeforeMount(async () => {
  for (let i = 0; i < 50; i++) {
    randomGifs.value?.push((await giphy.fetchRandomGif()) as IGif)
  }
})
</script>
