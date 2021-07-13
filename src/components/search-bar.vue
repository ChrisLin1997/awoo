<template>
  <header>
    <n-input v-bind="$attrs" type="text" />
    <n-button @click="handleSearch">搜尋</n-button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NInput, NButton } from 'naive-ui'

export default defineComponent({
  name: 'search-bar',

  components: {
    NInput,
    NButton,
  },

  setup (props, context) {
    const handleSearch = () => { context.emit('search') }

    return {
      handleSearch,
    }
  }
})
</script>
