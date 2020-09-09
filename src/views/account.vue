<template>
<div>
  <b-row id="account">
    <b-col cols=6 class="account">
      <h1>Mon compte</h1>
      <form @submit.prevent="submit()">
        <b-row>
          <b-col cols=2>
            <Avatar :username="users.firstname+` `+users.surname" :size="60"></Avatar>
          </b-col>
          <b-col cols=8>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <b-row class="ligform">
              <b-col cols=4><label for="firstname">Prénom *</label></b-col>
              <b-col cols=4><input type="text" v-model="users.firstname" /></b-col>
            </b-row>
            <b-row class="ligform">
              <b-col cols=4><label for="surname">Nom *</label></b-col>
              <b-col cols=4><input type="text" v-model="users.surname" /></b-col>
            </b-row>
            <b-button type="button" v-on:click="updateUser()" class="bouton">Modifier</b-button>
            <b-button type="button" v-on:click="deleteUser()" class="bouton">Supprimer</b-button> 
          </b-col>
        </b-row>
      </form>
    </b-col>
  </b-row>
  <footer>© Groupomania * 2020</footer>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex"
import Avatar from 'vue-avatar'

export default {
  props: {
    errorMessage: {
      type: String,
      default: ""
    },
  },

  methods: {
    // Mise à jour du compte utilisateur
    updateUser() {
      if(this.users.firstname != "" && this.users.surname != "" ) {
          const user = {firstname: this.users.firstname, surname: this.users.surname}
          axios.put("http://localhost:3000/api/auth/"  + this.userId, {  user:user 
          }).then(response => {
              this.user = response
              console.log(response)
          }).catch(() => {
              console.log("nok")
              this.errorMessage = "L'utilisateur n'a pas été mis à jour"
          })
      } else {
          console.log("Des informations sont manquantes")
      }
    },
    // Suppression du compte utilisateur
    deleteUser() {
      axios.delete("http://localhost:3000/api/auth/" + this.userId
        ).then(response => {
            this.user = response
            console.log(response)
            this.$emit("authenticated", false)
            this.$router.replace({ name: "login" })
        }).catch(() => {
            console.log("nok")
            this.errorMessage = "L'utilisateur n'a pas été supprimé"
        })
    }
  },
  components: {    
    Avatar
  },  
  computed: {
    ...mapState(["users"]),
  },
}
</script>

<style scoped>
  .account {
    margin: 2em auto;
  }
  #account {
    color: #2c3e50;
    background-color: rgb(245, 245, 245);
    height: calc(100vh - 92px);
  }
  .ligform {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  input, label {
    padding: 0.2em;
    margin: 0.5em;
    border-radius: 0.5em;
    }
  .bouton {
    margin-right: 1em;
  }
  .error { color: tomato; }
</style>  