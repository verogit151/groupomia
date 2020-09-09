<template>
  <div id="app">
    <b-row>
      <b-col>
        <div class="hello">Bonjour {{ users.firstname }} | Karma : {{ users.karma }}</div>
      </b-col>
    </b-row>
    <div class="main">
      <PostArticle/>
      <h1>Les derniers articles</h1>
      <ListArticle/>
    </div>
    
  </div>
</template>

<script>
//import axios from 'axios'
import { mapState } from "vuex"
import PostArticle from "../components/PostArticle"
import ListArticle from "../components/ListArticle"

export default {
  name: 'app',
  
  computed: {
    ...mapState(["users"]),
  },
  components: { PostArticle, ListArticle }
}
</script>

<style lang="scss">
#app {
  margin: auto;
  padding: 1em;
  color: #2c3e50;
  background-color: rgb(245, 245, 245);
  height: calc(100vh - 92px);
  text-align: center;
}
.hello {
  font-weight: bold;
  float: right;
  font-size: 0.8rem;
}
</style>
