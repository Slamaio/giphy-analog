<template>
  <v-main>
    <v-container fluid>
      <GoBackButton block />
      <v-card v-if="gif?.id" color="background" flat>
        <v-card-title class="px-0 text-wrap">
          {{ gifStrippedTitle }}
          <span v-if="gif.user">
            by <router-link to="/user">{{ gif.user.display_name }}</router-link>
          </span>
        </v-card-title>

        <v-card-text class="px-0">
          <GifCard :gif="gif" original shareable />
        </v-card-text>
      </v-card>

      <v-alert
        v-else
        prominent
        class="mx-auto my-5 justify-center"
        type="error"
        title="Error!"
        text="Gif not found."
        max-width="600"
      />

      <v-card color="background" flat>
        <v-card-title class="ml-11">Random gifs</v-card-title>
        <v-slide-group v-model="model" show-arrows center-active>
          <v-slide-group-item v-for="randomGif in randomGifs" :key="randomGif.id">
            <GifCard class="mx-2" :gif="randomGif" :to="/gifs/ + randomGif.id" />
          </v-slide-group-item>
        </v-slide-group>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { IGif } from 'env'
import giphy from '@/api/giphy'
import { useAppStore } from '@/stores/app'
import GifCard from '@/components/GifCardComponent.vue'
import GoBackButton from '@/components/GoBackButtonComponent.vue'
import { computed } from 'vue'

const route = useRoute()
const appStore = useAppStore()

const model = ref(null)
const randomGifs = ref<IGif[]>([])
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

const gifStrippedTitle = computed(() => {
  if (!gif.value.user) return gif.value.title

  const end = gif.value.title.lastIndexOf(gif.value.user.display_name)
  const strippedTitle = gif.value.title.substring(0, end - 3) // -3 to account for the length of ' by '
  return strippedTitle
})

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
