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
    createArticle(newArticle, formdata){
      console.log("création article")
      axios.post("http://localhost:3000/api/articles", {  article:newArticle
      }, 
      ).then(response => {
          this.user = response
          this.articles_id = response.data.id
          console.log(formdata)
          if (formdata) {
            console.log("deuxieme axios")
            axios.put("http://localhost:3000/api/articles/" + this.articles_id, formdata,
            ).then(response => {
                this.user = response
                  console.log("image ajoutée")
            }).catch(() => {
                this.errorMessage = "NOK !!!"
            })
          }
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
