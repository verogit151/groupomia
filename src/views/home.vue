<template>
  <div id="app">
    <div class="main">
      <PostArticle @submit="createArticle"/>
      <h1>Les derniers articles</h1>
      <ListArticle/>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import PostArticle from "../components/PostArticle"
import ListArticle from "../components/ListArticle"

export default {
  name: 'app',
  methods: {
    createArticle(newArticle){
      console.log("création article")
      console.log(newArticle)
      axios.post("http://localhost:3000/api/articles", {  article:newArticle },{ headers:
      { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
          this.user = response
         // if (response.status === 200) {
            console.log(response)
          //} 
      }).catch(() => {
          this.errorMessage = "NOK !!!"
      })
    },
  },

  components: { PostArticle, ListArticle }
}
</script>

<style lang="scss">
#app {
  margin: auto;
  color: #2c3e50;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
