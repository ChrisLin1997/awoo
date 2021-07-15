<template>
  <section class="wrapper">
    <div class="sort">
      <n-dropdown :options="sortOptions" @select="updateSort" trigger="click">
        <n-button>{{ sortOptions.find(item => item.key === sort)?.label || '排序' }}</n-button>
      </n-dropdown>
    </div>

    <article class="article" v-for="item of data" :key="item.url" @click="updateDetail(item)">
      <div class="article-wrap">
        <div>{{ `${item.author}, ${dayjs(item.publishedAt).format('YYYY-MM-DD HH:mm:ss')}` }}</div>
        <h3 class="ellipsis">{{ item.title }}</h3>
        <p class="ellipsis">{{ item.description }}</p>
      </div>
      <img class="img" :src="item.urlToImage" />
    </article>

    <n-pagination class="page" v-if="data.length" v-bind="$attrs" :page-count="count" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, readonly } from 'vue'
import { NPagination, NDropdown, NButton } from 'naive-ui'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'news-list',

  components: {
    NPagination,
    NDropdown,
    NButton,
  },

  props: {
    data: {
      type: Array as PropType<Article[]>,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    sort: {
      type: String,
      required: true,
    },
  },

  emits: ['updateSort', 'updateDetail'],

  setup (props, context) {
    const sortOptions = readonly([
      { label: '相關度', key: 'relevancy' },
      { label: '人氣', key: 'popularity' },
      { label: '發布時間', key: 'publishedAt' },
    ])

    const count = computed(() => Math.ceil(props.total / 20))

    const updateSort = (key: string) => {
      context.emit('updateSort', key)
    }

    const updateDetail = (item:Article) => {
      context.emit('updateDetail', item)
    }

    return {
      dayjs,
      sortOptions,
      count,
      updateSort,
      updateDetail,
    }
  }
})
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
  text-align: center;
}

.article {
  padding: .8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 180px;
  text-align: left;
  cursor: pointer;
  transition: all .2s;
}

.article:not(:last-child) {
  border-bottom: 1px solid gray;
}

.article:hover {
  background-color: rgba(0, 128, 0, 0.12);
}

.article-wrap {
  width: 70%;
}

.img {
  margin-left: 24px;
  width: 30%;
  max-width: 200px;
  height: fit-content;
  vertical-align: middle;
  background-size: contain;
}

.ellipsis {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page {
  margin: 24px;
  justify-content: center;
}

.sort {
  margin: 16px;
  text-align: right;
}

</style>
