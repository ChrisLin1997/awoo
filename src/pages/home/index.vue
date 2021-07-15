<template>
  <header class="header">
    <h1>NEWS API SEARCH</h1>

    <div class="search-wrap">
      <n-input
        class="input"
        v-model:value="searchText"
        @keyup.enter="handleSearch"
        type="text"
      />
      <n-date-picker
        class="date-picker"
        v-model:value="dateRange"
        type="datetimerange"
        format="yyyy-MM-dd HH:mm:ss"
        :is-date-disabled="disablePreviousDate"
        clearable
      />
      <n-button class="btn" @click="handleSearch" type="primary">搜尋</n-button>
    </div>
  </header>

  <main class="main">
    <news-list
      v-show="isList"
      v-model:page="page"
      :data="newsList"
      :total="total"
      :sort="sort"
      @updateSort="updateSort"
      @updateDetail="updateDetail"
    />
    <news-detail
      v-show="!isList"
      :detail="detail"
      @updateDetail="updateDetail"
    />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import NewsList from './news-list.vue'
import NewsDetail from './news-detail.vue'
import { getNewsListService } from '@/api'
import { NInput, NButton, NDatePicker, useLoadingBar, NLoadingBarProvider } from 'naive-ui'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'home',

  components: {
    NLoadingBarProvider,
    NewsList,
    NewsDetail,
    NInput,
    NButton,
    NDatePicker,
  },

  setup () {
    const detail = ref<Article | null>(null)
    const updateDetail = (value: Article | null) => {
      detail.value = value
    }
    const isList = computed(() => detail.value === null)
    
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
    const disablePreviousDate = (ts: number) => {
        return ts > Date.now()
    }

    const loadingBar = useLoadingBar()

    const getNewsList = async () => {
      if (searchText.value === '') return 

      loadingBar?.start()

      const submitForm: NewsForm = {
        q: searchText.value,
        page: page.value,
      }
      if (dateRange.value) submitForm.from = dayjs(dateRange.value[0]).format('YYYY-MM-DDTHH:mm:ss')
      if (dateRange.value) submitForm.to = dayjs(dateRange.value[1]).format('YYYY-MM-DDTHH:mm:ss')
      if (sort.value) submitForm.sortBy = sort.value
      const result = await getNewsListService(submitForm)
      newsList.value = result.articles

      loadingBar?.finish()
    }

    const handleSearch = () => {
      page.value = 1
      detail.value = null
      getNewsList()
    }

    getNewsList()    

    return {
      detail,
      updateDetail,
      isList,

      searchText,

      sort,
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

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  background-color: rgba(0, 128, 0, 0.24);
}

.main {
  padding: 0 16px;
}

.search-wrap {
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  max-width: 400px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.input {
  margin-bottom: 12px;
  width: 100%;
}

.date-picker {
  margin-bottom: 12px;
  width: 100%;
}

.btn {
  width: 100%;
}
</style>
