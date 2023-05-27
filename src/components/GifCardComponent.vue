<template>
  <div>
    <v-card :to="clickable ? /gifs/ + gif.id : ''">
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

    <v-slide-y-reverse-transition>
      <v-alert
        v-if="copySuccess"
        class="copy_alert"
        type="success"
        title="Link copied to clipboard"
      />
      <v-alert
        v-else-if="copyError"
        class="copy_alert"
        type="success"
        title="Copy to clipboard failed"
      />
    </v-slide-y-reverse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IGif } from 'env'

defineProps<{
  gif: IGif
  original?: boolean
  shareable?: boolean
  clickable?: boolean
}>()

const copySuccess = ref(false)
const copyError = ref(false)

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
    copySuccess.value = true
  } catch (e) {
    copyError.value = true
  }
  setTimeout(() => {
    copySuccess.value = false
    copyError.value = false
  }, 2000)
}
</script>

<style scoped>
.copy_alert {
  position: fixed;
  left: 1.5rem;
  bottom: 1.5rem;
  max-width: calc(100svw - 3rem);
  z-index: 9999;
}
</style>
