<template>
  <div>
    <b-row class="addcomment">
      <b-col>
        
        <form @submit.prevent="submit()">
            <div class="reply">
              <input type="hidden" v-model="articleId" value="articleId"/>
               <Avatar :username="`${this.users.firstname + ' ' + this.users.surname}`" :size="30"></Avatar>
              <input 
                  type="text" 
                  aria-label="commentaire"
                  v-model.trim="comment" 
                  class="reply--text" 
                  placeholder="Laisser un commentaire..."
                  maxlength="250"
                  required
              />
              <button type="submit"
                  class="reply--button">
                  Publier
              </button>
            </div>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'
import Avatar from 'vue-avatar'
import axios from 'axios'
import {mapState} from "vuex"

export default {
    name: "AddComment",
    data() {
        return {
            comments: ``,
            comment: ``,
        }
    },
    props: {
      articleId: {
        type: Number,
        required: true
      }
    },
    methods:{
        //Affichage de la liste des commentaires
        listComments() {
          const articleId = this.articleId
          axios.get("http://localhost:3000/api/articles/comments/" + articleId
              ).then(response => {
                this.comments = response.data
              }).catch(error => {
                console.log(error)
              })
        },
        // Ajout d'un nouveau commentaire
        submit() {
            this.$emit("submit", {
              articles_id: this.articleId,
              comment: this.comment,
              author_users_id: this.users.userId,
              date: moment().format(),
            })
            this.listComments()
            this.comment=``
        },
        // Suppression d'un commentaire (modération Administrateur)
        deleteComment(comment_id) {
          axios.delete("http://localhost:3000/api/articles/comment/" + comment_id, 
            ).then(() => {
                this.listComments()
                console.log("commentaire supprimé")
            }).catch(() => {
                this.errorMessage = "NOK !!!"
            })
        },
    },
    components: {    
        Avatar
    },  
    computed: {
      ...mapState(['users'])
    }
}
  
</script>

<style scoped>
  .addcomment {
    margin-top: 1em !important;
    padding: 0 2em;
    background-color: white;
    border-top-left-radius: 0em;
    border-top-right-radius: 0em;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
  }
  .reply {
    display: flex;
    background: rgb(245, 245, 245);
    border-radius: 1.5em;
    padding: 0.7em;
  }
  .reply input[type=text]{
    width: 70%;
    margin-left: 1em;
    margin-right: 1em;
  }
  .reply--text {
    border-color: silver;
  }
 input:focus, input:required, input:invalid {
    border-color: silver;
  }

 </style>