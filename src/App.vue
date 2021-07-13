<template>
  <header>
    <n-input v-model:value="searchText" type="text" />
    <n-button @click="handleSearch">搜尋</n-button>
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
import { computed, defineComponent, ref, watch } from 'vue'
import NewsList from '@/components/news-list.vue'
import NewsDetail from '@/components/news-detail.vue'
import { getNewsListService } from '@/api'
import { NInput, NButton } from 'naive-ui'

enum Type { list, detail }

export default defineComponent({
  name: 'App',

  components: {
    NewsList,
    NewsDetail,
    NInput,
    NButton,
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

    const dateRange = ref([])

    watch(page, () => getNewsList())

    const handleSearch = () => {
      page.value = 1
      getNewsList()
    }
    const getNewsList = async () => {
      if (searchText.value === '') return 

      const submitForm: NewsForm = {
        q: searchText.value,
        page: page.value,
      }
      // if (from) submitForm.from = from
      // if (to) submitForm.to = to
      if (sort.value) submitForm.sortBy = sort.value
      // if (page) submitForm.page = page
      const result = await getNewsListService(submitForm)
      newsList.value = result.articles
    }

    getNewsList()
    

    return {
      type,
      isList,

      sort,
      sortOptions,
      updateSort,

      searchText,
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
