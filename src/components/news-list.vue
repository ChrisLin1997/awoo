<template>
    <section class="wrapper">
      <div class="sort">
        <n-dropdown :options="sortOptions" @select="handleSort" trigger="click">
          <n-button>{{ sortOptions.find(item => item.key === sort)?.label || '排序' }}</n-button>
        </n-dropdown>
      </div>

      <article class="article" v-for="item of data" :key="item.url">
        <div class="article-wrap">
          <div>{{ `${item.author}, ${dayjs(item.publishedAt).format('YYYY-MM-DD HH:mm:ss')}` }}  </div>
          <h3>{{ item.title }}</h3>
          <p class="description">{{ item.description }}</p>
        </div>
        <img class="img" :src="item.urlToImage" />
      </article>

      <n-pagination class="page" v-if="data.length" v-bind="$attrs" :page-count="count" />
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
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
    sortOptions: {
      type: Array,
      required: true,
    }
  },

  emits: ['updateSort'],

  setup (props, context) {
    const count = computed(() => Math.ceil(props.total / 20))

    const handleSort = (key: string) => {
      context.emit('updateSort', key)
    }

    return {
      dayjs,
      count,
      handleSort,
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
  padding: 12px 16px;
  display: flex;
  text-align: left;
  cursor: pointer;
}

.article:not(:last-child) {
  border-bottom: 1px solid gray;
}

.article:hover {
  background-color:aliceblue;
}

.article-wrap {
  flex: 1;
}

.img {
  margin-left: 24px;
  width: 30%;
  max-width: 200px;
  height: auto;
  vertical-align: middle;
}

.description {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page {
  margin: 24px;
  justify-content: center;
}

.sort {
  margin: 8px 16px;
  text-align: right;
}

</style>
