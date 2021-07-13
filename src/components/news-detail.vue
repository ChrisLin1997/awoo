<template>
  <div>
    <span>news-detail</span>
    <img :src="ArrowBack" />
    <span>返回</span>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import ArrowBack from '@/assets/ArrowBackUp.svg'

export default defineComponent({
  name: 'news-detail',
  // props: {
  //   id: {
  //     type: String,
  //     required: true
  //   }
  // },

  setup () {
    return { 
      ArrowBack,
    }
  }
})
</script>
