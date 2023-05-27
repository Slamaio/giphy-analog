<template>
  <v-card>
    <v-img
      class="mx-auto"
      max-width="900"
      height="100%"
      :lazy-src="gif.images.fixed_height_still.url"
      :src="original ? gif.images.original.url : gif.images.fixed_height.url"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
        </div>
      </template>
    </v-img>

    <v-card-actions v-if="shareable">
      <v-spacer />
      <v-btn @click.prevent="share(gif)">Share</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { IGif } from 'env'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

defineProps<{
  gif: IGif
  original?: boolean
  shareable?: boolean
}>()

async function share(gif: IGif) {
  if (navigator.share) {
    await navigator.share({
      title: gif.title,
      text: gif.title,
      url: gif.url,
    })
  } else {
    console.log('Web Share API not supported.')
    await toClipboard(`${gif.title}\n${gif.url}`)
  }
}

async function toClipboard(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    appStore.copyAlert = 'success'
  } catch (e) {
    appStore.copyAlert = 'error'
  }
  setTimeout(() => {
    appStore.copyAlert = 'none'
  }, 2000)
}
</script>
