<template>
  <n-loading-bar-provider>
    <home />
  </n-loading-bar-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NLoadingBarProvider } from 'naive-ui'
import Home from '@/pages/home/index.vue'

export default defineComponent({
  name: 'App',

  components: {
    NLoadingBarProvider,
    Home
  },
})
</script>
