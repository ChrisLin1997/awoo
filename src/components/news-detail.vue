<template>
  <div>
    <n-button @click="() => {}">
      <img class="back" :src="ArrowBack" />
    </n-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import ArrowBack from '@/assets/ArrowBackUp.svg'
import { NButton } from 'naive-ui'

export default defineComponent({
  name: 'news-detail',

  components: {
    NButton,
  },

  setup () {
    return { 
      ArrowBack,
    }
  }
})
</script>

<style scoped>
.back {
  width: 36px;
}
</style>
