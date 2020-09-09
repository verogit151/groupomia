<template>
  <div>
    <b-row>
      <b-col cols=12 lg=6 class="listarticle">
        <p class="search">
          <label for="search">Rechercher</label>
          <input type="text" id="search" v-model="search"/>
        </p>
        <p v-for="(item, index) in filteredPosts" :key="index" class="editarticle">
          <b-row class="author">
            <b-col>
              <span >{{ item.user }} {{ item.dateform }}</span>
            </b-col>
          </b-row>
          <b-row class="content">
            <b-col class="article__image">
              <span v-if="item.imageURL=='NULL'"><img src="../assets/Groupomia_Logos/icon-above-font.png" alt="groupomia" height="170px"/></span>
              <span v-else><img :src="item.imageURL" alt="" /></span>
            </b-col>
            <b-col class="article__content">
              <span v-html="item.content"></span>
            </b-col>
            <span v-if="users.roleId===1" class="delarticle">
              <b-icon icon="trash" font-scale="1.2" @click="deleteArticle(item.articles_id)"></b-icon>
            </span>
          </b-row>
          <b-row class="content_social">
            <b-col>
              <div class="social">
                <span v-if="item.likeArticle"> 
                   <b-icon icon="heart-fill" font-scale="1.5" variant="danger" @click="dislikeArticle(item.articles_id)" ></b-icon>
                </span>
                <span v-else>
                  <b-icon icon="heart" font-scale="1.5" @click="likeArticle(item.articles_id)" ></b-icon>
                </span>
                <ListComment :articleId="item.articles_id"/>
                
              </div>
            </b-col>
          </b-row>
          <b-row class="content_footer">
            <b-col> 
               <b-icon icon="heart-fill" font-scale="0.8" variant="light"></b-icon>
              <span class="social__number">{{ item.totalLikes }}</span>
              
            </b-col>
          </b-row>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios' 
import ListComment from "./ListComment"
import {mapState} from "vuex"

export default {
  name: "ListArticle",
  data() {
    return {
      search: ``,
      articles_id: ``
    }
  },
  methods: {
    // Suppression d'un article (Modération Administrateur)
    deleteArticle(articles_id) {
      axios.delete("http://localhost:3000/api/articles/" + articles_id, 
        ).then(() => {
            this.$store.dispatch('loadPosts', this.users.userId)
            console.log("article supprimé")
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
    },
    // Like d'un article
    likeArticle(articles_id) {
      const likePost = {
            articles_id: articles_id,
            users_id: this.users.userId
      }
      axios.post("http://localhost:3000/api/articles/like", { like:likePost },
        ).then(() => {
            this.$store.dispatch('loadPosts', this.users.userId)
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
    },
    // Suppression du like d'un article
    dislikeArticle(articles_id) {
      const dislikePost = {
            articles_id: articles_id,
            users_id: this.users.userId
      }
      axios.post("http://localhost:3000/api/articles/dislike", { dislike:dislikePost },
        ).then(() => {
            this.$store.dispatch('loadPosts', this.users.userId)
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
    },
  },
  mounted() {
    this.$store.dispatch('loadPosts', this.users.userId)
  },
  computed: {
    ...mapState(['posts']),
    filteredPosts: function() {
        return this.posts.filter((item) => {
          return item.content.match(this.search)
        })
    },
    ...mapState(['users'])
  },  
  components: { ListComment }
}
  
</script>

<style scoped>
  .listarticle {
    margin: auto;
  }
  .search input[type=text] {
    width: 80%;
    margin-left: 1em;
    margin-bottom: 2em;
    border-radius: 0.5em;
  }
  .editarticle {
    border-radius: 2em;
    box-shadow: 0 0 20px 1px rgb(119, 118, 118);
    background-color: rgb(128, 1, 1);
    text-align: left;
    margin: 3em auto;
  }
  .author {
    height: 4em;
    text-align: right;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: white;
    margin: 0;
    padding: 1em;
  }
  .content {
    border-top-right-radius: 2em;
    border-top-left-radius: 2em;
    margin: -2em 0 0 0;
    padding: 1em 1em 0 1em;
    background-color: white;
  }
  .article__image img{
    border-radius: 2em;
    max-width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .article__content{
    float: right;
    margin-top: 1em;
  }
  .content_social{
    margin: -2em 0 0 0;
    padding: 0 1em;
    background-color: white;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
  }
  .social {
    margin: 0;
  }
  .social span{
    margin: 0.5em;
  }
  .delarticle {
    float: right;
  }
  .social__number {
    margin: 1em;
    line-height: 2em;;
  }
  .content_footer {
    color: white;
    margin: 0.2em;
    padding-bottom: 0.5em; 
  }

</style>