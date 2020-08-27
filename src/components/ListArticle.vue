<template>
  <div>
    <b-row>
      <b-col cols=6 class="listarticle">
        <p v-for="(item, index) in posts" :key="index" class="editarticle">
          <span class="Author"></span>
          <span v-html="item.content"></span>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: "ListArticle",
  mounted() {
    this.$store.dispatch('loadPosts')
  },
  computed: {
    ...mapState([
      'posts'
    ])
  }
}
  
</script>

<style scoped>
  .listarticle {
    margin: auto;
  }
  
  .editarticle {
    border: rgb(95, 95, 95) 1px solid;
    text-align: left;
  }
</style>