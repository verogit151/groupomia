<template>
  <div>
    <b-row>
      <b-col cols=6 class="listarticle">
        <input type="text" v-model="search" placeholder="Rechercher un article"/>
        <p v-for="(item, index) in filteredPosts" :key="index" class="editarticle">
          <b-row>
            <b-col>
              <span class="Author">{{ item.user }} {{ item.dateform }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols=5>
              <span v-if="item.imageURL=='NULL'"><img src="../assets/Groupomia_Logos/icon-above-font.svg" alt="groupomia" class="article__image"/></span>
              <span v-else><img :src="item.imageURL" alt="" class="article__image"/></span>
            </b-col>
            <b-col cols=7>
              <span v-html="item.content"></span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols=12>
                <button type="button" @click="likeArticle(item.articles_id)">Liker</button>
                <button type="button" v-if="roleId==1" @click="deleteArticle(item.articles_id)">Supprimer</button>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <AddComment :articleId="item.articles_id" @submit="addComment"/>
            </b-col>
          </b-row>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios' 
import AddComment from "./AddComment"
import {mapState} from "vuex"
// import { mapGetters } from 'vuex'

export default {
  name: "ListArticle",
  data() {
    return {
      roleId: localStorage.getItem("roleId"),
      userId: localStorage.getItem("userId"),
      search: ``
    }
  },
  methods: {
    addComment(newComment) {
      console.log(newComment)
      axios.post("http://localhost:3000/api/articles/comment", {  comment:newComment
      }, 
      ).then(response => {
          this.user = response
      }).catch(() => {
          this.errorMessage = "NOK !!!"
      })
    },
    deleteArticle(articles_id) {
      axios.delete("http://localhost:3000/api/articles/" + articles_id, 
        ).then(() => {
            this.$store.dispatch('loadPosts')
            console.log("article supprimé")
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
    },
    likeArticle(articles_id) {
      console.log(articles_id)
      axios.post("http://localhost:3000/api/articles/" + this.userId + "/1",
        ).then(() => {
            // this.$store.dispatch('loadPosts')
            // console.log("article supprimé")
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
    },
  },
  mounted() {
    this.$store.dispatch('loadPosts')
      
  },
  computed: {
    ...mapState(['posts']),
    filteredPosts: function() {
        return this.posts.filter((item) => {
          return item.content.match(this.search)
        })
    }
  },  
  components: { AddComment }
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
  .article__image{
    max-height: 200px;
    display:block;
    margin-top:10px;
  }
</style>