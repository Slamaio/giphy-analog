<template>
  <v-card>
    <v-img
      :height="height"
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

defineProps<{
  gif: IGif
  original?: boolean
  shareable?: boolean
  height?: string
}>()

function share(gif: IGif) {
  if (navigator.share) {
    navigator
      .share({
        title: gif.title,
        text: gif.title,
        url: gif.url,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
  } else {
    console.log('Web Share API not supported.')
  }
}
</script>
