<template>
  <header class="header">
    <n-input 
      v-model:value="searchText"
      @keyup.enter="handleSearch"
      type="text"
    />
    <n-date-picker
      v-model:value="dateRange"
      type="datetimerange"
      format="yyyy-MM-dd HH:mm:ss"
      :is-date-disabled="disablePreviousDate"
      clearable
    />
    <n-button @click="handleSearch" type="primary">搜尋</n-button>
  </header>

  <main>
    <news-list
      v-show="isList"
      v-model:page="page"
      :data="newsList"
      :total="total"
      :sort="sort"
      :sortOptions="sortOptions"
      @updateSort="updateSort"
    />
    <news-detail v-show="!isList" />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import NewsList from '@/components/news-list.vue'
import NewsDetail from '@/components/news-detail.vue'
import { getNewsListService } from '@/api'
import { NInput, NButton, NDatePicker } from 'naive-ui'
import dayjs from 'dayjs'

enum Type { list, detail }

export default defineComponent({
  name: 'App',

  components: {
    NewsList,
    NewsDetail,
    NInput,
    NButton,
    NDatePicker,
  },

  setup () {
    const type = ref(Type.list)
    const isList = computed(() => type.value === Type.list)
    
    const sortOptions = [
      { label: '相關度', key: 'relevancy' },
      { label: '人氣', key: 'popularity' },
      { label: '發布時間', key: 'publishedAt' },
    ]
    const sort = ref('')
    const updateSort = (key: string) => {
      sort.value = key
      getNewsList()
    }

    const total = 100
    const searchText = ref('COVID-19')
    const newsList = ref<Article[]>([])
    const page = ref(1)
    watch(page, () => getNewsList())

    const dateRange = ref<[number, number] | null>(null)
    const disablePreviousDate = (ts) => {
        return ts > Date.now()
    }

    const getNewsList = async () => {
      if (searchText.value === '') return 

      const submitForm: NewsForm = {
        q: searchText.value,
        page: page.value,
      }
      if (dateRange.value) submitForm.from = dayjs(dateRange.value[0]).format('YYYY-MM-DDTHH:mm:ss')
      if (dateRange.value) submitForm.to = dayjs(dateRange.value[1]).format('YYYY-MM-DDTHH:mm:ss')
      if (sort.value) submitForm.sortBy = sort.value
      const result = await getNewsListService(submitForm)
      newsList.value = result.articles
    }

    const handleSearch = () => {
      page.value = 1
      getNewsList()
    }

    getNewsList()
    

    return {
      type,
      isList,

      searchText,

      sort,
      sortOptions,
      updateSort,

      dateRange,
      disablePreviousDate,

      newsList,
      handleSearch,
      getNewsList,
      total,
      page,
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
.header {
  
}
</style>
