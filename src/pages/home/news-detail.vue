<template>
  <div class="wrapper">
    <header class="header">
      <n-button @click="updateDetail">
        <img class="back" :src="ArrowBack" />
      </n-button>
    </header>

    <article v-if="detail !== null">
      <h1>{{ detail.title }}</h1>
      <div>{{ `${detail.author}, ${dayjs(detail.publishedAt).format('YYYY-MM-DD HH:mm:ss')}` }}</div>
      <img class="img" :src="detail.urlToImage">
      <p>{{ detail.content }}</p>
      <div class="source">
        <span>*source: </span>
        <span class="source-name">{{ detail.source.name }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ArrowBack from '@/assets/ArrowBackUp.svg'
import { NButton } from 'naive-ui'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'news-detail',

  components: {
    NButton,
  },

  props: {
    detail: {
      type: [Object, null] as PropType<Article | null>,
    },
  },

  emits: ['updateType', 'updateDetail'],

  setup (props, context) {
    const updateDetail = () => {
      context.emit('updateDetail', null)
    }

    return { 
      dayjs,
      ArrowBack,
      updateDetail,
    }
  }
})
</script>

<style scoped>
.wrapper {
  margin: 24px auto 48px;
  max-width: 1024px;
  width: 100%;
}

.header {
  text-align: left;
}

.back {
  width: 36px;
}

.img {
  margin: 24px 0;
  width: 80%;
}

.source {
  text-align: right;
  font-size: 18px;
}

.source-name {
  font-weight: bold;
  border-bottom: 1px solid;
}
</style>
