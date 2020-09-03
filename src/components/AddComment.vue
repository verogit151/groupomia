<template>
  <div>
    <b-row>
      <b-col cols=6 class="listcomment">
        <p v-for="(item, index) in comments" :key="index" class="editcomment">
          <span class="Author">{{ item.user }} {{ item.dateform }}</span>
          <span v-html="item.comment"></span>
          <button type="button" @click="likeComment(item.comment_id)">Liker</button>
          <button type="button" v-if="roleId==1" @click="deleteComment(item.comment_id)">Supprimer</button>
        </p>
        <form @submit.prevent="submit()">
            <div class="reply">
                <div class="avatar">
                    <!-- <img :src="current_user.avatar" alt=""> -->
                </div>
                <input type="hidden" v-model="articleId" value="articleId"/>
                <input 
                    type="text" 
                    v-model.trim="comment" 
                    class="reply--text" 
                    placeholder="Laisser un commentaire..."
                    maxlength="250"
                    required
                />
                <button type="submit"
                    class="reply--button">
                    <i class="fa fa-paper-plane"></i> Publier
                </button>
            </div>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
//import {mapState} from "vuex"

export default {
    name: "AddComment",
    data() {
        return {
            comments: ``,
            comment: ``,
            roleId: localStorage.getItem("roleId")
        }
    },
    props: {
      articleId: {
        type: Number,
        required: true
      }
    },
    methods:{
        listComments() {
          const articleId = this.articleId
          axios.get("http://localhost:3000/api/articles/comments/" + articleId
              ).then(response => {
                this.comments = response.data
              }).catch(error => {
                console.log(error)
              })
        },
        submit() {
            this.$emit("submit", {
            articles_id: this.articleId,
            comment: this.comment,
            author_users_id: localStorage.getItem("userId"),
            date: moment().format(),
            })
            this.comment=``
            this.listComments()
        },
        deleteComment(comment_id) {
          axios.delete("http://localhost:3000/api/articles/comment/" + comment_id, 
            ).then(() => {
                this.listComments()
                console.log("commentaire supprimé")
            }).catch(() => {
                this.errorMessage = "NOK !!!"
            })
        },
        // likeArticle(articles_id) {
        //   console.log(articles_id)
        //   axios.post("http://localhost:3000/api/articles/" + this.userId + "/1",
        //     ).then(() => {
        //         // this.$store.dispatch('loadPosts')
        //         // console.log("article supprimé")
        //     }).catch(() => {
        //         this.errorMessage = "NOK !!!"
        //     })
        // },
    },
    mounted() {
      //this.$store.dispatch('loadComments', {articleId: this.articleId})
      this.listComments()
    },
    // computed: {
    //   ...mapState(['comments']),
    // },  
}
  
</script>

<style scoped>
  .listcomment {
    margin: auto;
  }
  
  .editcomment {
    border: rgb(95, 95, 95) 1px solid;
    text-align: left;
  }
</style>