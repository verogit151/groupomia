<template>
  <span class="listcomment">
    <b-icon icon="chat" font-scale="1.5"></b-icon>
    <a v-if="comments.length>0" @click="toggle=!toggle">
      {{ comments.length }} commentaire<span v-if="comments.length>1">s</span>
    </a>
    <div v-show="toggle">
      <b-row>
        <b-col>
          <p v-for="(item, index) in comments" :key="index" class="editcomment">
            <span id="title">
              <Avatar :username="`${item.user}`" :size="25"></Avatar>
              <span class="author">{{ item.user }}</span>
              <b-icon icon="star-fill" font-scale="0.5" shift-v="-10"></b-icon>
              <span class="datecomment">{{ item.dateform }}</span><br/>
            </span>
            <span v-html="item.comment"></span> 
            <b-icon icon="trash" v-if="users.roleId==1" font-scale="0.8" @click="deleteComment(item.comment_id)" class="trash"></b-icon>
          </p>
        </b-col>
      </b-row> 
    </div>
    <div>
       <b-row>
            <b-col> 
              <AddComment :articleId="articleId" @submit="addComment"/>
             </b-col>
          </b-row>
    </div>
  </span>
</template>

<script>
// import moment from 'moment'
import Avatar from 'vue-avatar'
import axios from 'axios'
import AddComment from "./AddComment"
import {mapState} from "vuex"

export default {
    name: "ListComment",
    data() {
        return {
            comments: ``,
            comment: ``,
            toggle: false
        }
    },
    props: {
      articleId: {
        type: Number,
        required: true
      }
    },
    methods:{
        // Affichage des commentaires pour chaque article
        listComments() {
          const articleId = this.articleId
          console.log("article de listcomment")
          console.log(articleId)
          axios.get("http://localhost:3000/api/articles/comments/" + articleId
              ).then(response => {
                this.comments = response.data
              }).catch(error => {
                console.log(error)
              })
        },
        // Ajout d'un article
        addComment(newComment) {
          console.log(newComment)
          axios.post("http://localhost:3000/api/articles/comment", { comment:newComment, userId:this.users.userId, }, 
          ).then(response => {
              this.user = response
              this.listComments()
          }).catch(() => {
              this.errorMessage = "NOK !!!"
          })
          
        },
        // Suppression d'un commentaire (modération administrateur)
        deleteComment(comment_id) {
          axios.delete("http://localhost:3000/api/articles/comment/" + comment_id, { userId:this.users.userId, }
            ).then(() => {
                this.listComments()
                console.log("commentaire supprimé")
            }).catch(() => {
                this.errorMessage = "NOK !!!"
            })
        },
    },
    mounted() {
      this.listComments()
    }, 
    computed: {
      ...mapState(['users'])
    },  
    components: {  AddComment, Avatar }
}
  
</script>

<style scoped>
  .listcomment {
    margin: auto;
    background-color: white;
  }
  .listcomment a {
    text-decoration: underline !important;
    margin-left: 0.5em;
  }
  .listcomment a:hover {
    cursor: pointer;
  }
  .editcomment {
    text-align: left;
    margin-top: 0.5em;
  }
  #title {
    display: flex;
  }
  .author {
    margin-right: 0.4em;
    margin-left: 0.4em;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .datecomment {
    font-size: 0.7rem;
    margin-left: 0.2em;
    line-height: 1.8em;
  }
  .trash {
    float:right;
  }
</style>