<template>
  <div>
    <section>
      <article v-for="item of data" :key="item.title">
        <span>{{ item.title }}</span>
      </article>
    </section>

    <n-pagination v-if="total" v-bind="$attrs" :page-count="count"  show-quick-jumper/>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { NPagination } from 'naive-ui'

export default defineComponent({
  name: 'news-list',

  components: {
    NPagination,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },

  setup (props) {

    const count = computed(() => Math.ceil(props.total / 20))

    return {
      count,
    }
  }
})
</script>
