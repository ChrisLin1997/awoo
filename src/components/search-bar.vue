<template>
  <header>
    <span>search bar</span>
    <input type="text">
  </header>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'search-bar',

  setup () {
    const count = ref(0)
    return { count }
  }
})
</script>
