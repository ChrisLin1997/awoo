<template>
  <span>news-detail</span>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'news-detail',
  props: {
    id: {
      type: String,
      required: true
    }
  },

  setup () {
    const count = ref(0)
    return { count }
  }
})
</script>
