<template>
  <header class="header">
    <h1>NEWS API SEARCH</h1>

    <div class="search-wrap">
      <n-input
        class="input"
        v-model:value="searchForm.q"
        @keyup.enter="handleSearch"
        type="text"
      />
      <n-date-picker
        class="date-picker"
        v-model:value="searchForm.dateRange"
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
      v-model:page="searchForm.page"
      :data="newsList"
      :total="total"
      :sort="searchForm.sort"
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
import { computed, defineComponent, reactive, ref, watch, toRaw } from 'vue'
import NewsList from './news-list.vue'
import NewsDetail from './news-detail.vue'
import { getNewsListService } from '@/api'
import { NInput, NButton, NDatePicker, useLoadingBar, NLoadingBarProvider } from 'naive-ui'
import dayjs from 'dayjs'

const defaultForm: NewsForm = sessionStorage.getItem('form') ? 
  JSON.parse(sessionStorage.getItem('form') as string) : {
  q: 'COVID-19',
  dateRange: null,
  sort: 'relevancy',
  page: 1,
}

const total = 100

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
    // detail
    const detail = ref<Article | null>(null)
    const updateDetail = (value: Article | null) => {
      detail.value = value
    }
    const isList = computed(() => detail.value === null)

    // form
    const searchForm = reactive(defaultForm)
    const updateSort = (key: string) => {
      searchForm.sort = key
      getNewsList()
    }

    watch(() => searchForm.page, () => getNewsList())

    const saveForm = (form: NewsForm) => {
      sessionStorage.setItem('form', JSON.stringify(toRaw(form)))
    }

    // list
    const newsList = ref<Article[]>([])
    const loadingBar = useLoadingBar()
    const getNewsList = async () => {
      if (searchForm.q === '') return 

      loadingBar?.start()

      const submitForm: NewsSubmitForm = { q: searchForm.q, page: searchForm.page }
      if (searchForm.dateRange) submitForm.from = dayjs(searchForm.dateRange[0]).format('YYYY-MM-DDTHH:mm:ss')
      if (searchForm.dateRange) submitForm.to = dayjs(searchForm.dateRange[1]).format('YYYY-MM-DDTHH:mm:ss')
      if (searchForm.sort) submitForm.sortBy = searchForm.sort
      const result = await getNewsListService(submitForm)
      newsList.value = result.articles
      saveForm(searchForm)

      loadingBar?.finish()
    }

    const handleSearch = () => {
      searchForm.page = 1
      detail.value = null
      getNewsList()
    }

    getNewsList()

    const disablePreviousDate = (ts: number) => ts > Date.now()

    return {
      total,

      detail,
      updateDetail,
      isList,

      searchForm,
      updateSort,

      newsList,
      handleSearch,
      getNewsList,

      disablePreviousDate,
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
