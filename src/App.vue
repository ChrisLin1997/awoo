<template>
  <search-bar v-model:value="searchText" @search="handleSearch" />
  <main>
    <news-list v-show="true" :data="newsList" v-model:page="newsPage" :total="newsTotal" />
    <NewsDetail v-show="true" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import SearchBar from '@/components/search-bar.vue'
import NewsList from '@/components/news-list.vue'
import NewsDetail from '@/components/news-detail.vue'
import { getNewsListService } from '@/api'


export default defineComponent({
  name: 'App',
  components: {
    SearchBar,
    NewsList,
    NewsDetail,
  },

  setup () {
    const searchText = ref('COVID-19')

    const newsList = ref<Article[]>([])
    const newsTotal = ref(0)
    const newsPage = ref(1)

    const handleSearch = () => {
      newsPage.value = 1
      getNewsList()
    }
    const getNewsList = async () => {
      if (searchText.value === '') return 
      // const submitForm: NewsForm = {
      //   q: searchText.value,
      //   page: newsPage.value,
      // }
      // if (from) submitForm.from = from
      // if (to) submitForm.to = to
      // if (sortBy) submitForm.sortBy = sortBy
      // if (page) submitForm.page = page
      // const result = await getNewsListService(submitForm)
      // newsList.value = result.articles
      // newsTotal.value = result.totalResults
    }


    watch(newsPage, () => getNewsList())

    return {
      searchText,
      newsList,
      handleSearch,
      getNewsList,
      newsTotal,
      newsPage,
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
