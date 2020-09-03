<template>
  <b-row>
    <b-col cols=6 class="account">
      <form @submit.prevent="submit()">
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <b-row class="ligform">
          <b-col cols=4><label for="firstname">Prénom *</label></b-col>
          <b-col cols=4><input type="text"  v-model="firstname" /></b-col>
        </b-row>
        <b-row class="ligform">
          <b-col cols=4><label for="surname">Nom *</label></b-col>
          <b-col cols=4><input type="text"  v-model="surname" /></b-col>
        </b-row>
        <b-button type="button" v-on:click="updateUser()" class="bouton">Modifier</b-button>
        <!-- <button type="button">Annuler</button> -->
        <b-button type="button" v-on:click="deleteUser()" class="bouton">Supprimer</b-button> 
      </form>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userId: this.$route.query.id,
      firstname: "",
      surname: ""
    }
  },
  mounted () {
    axios.get("http://localhost:3000/api/auth/" + this.userId
      ).then(response => {
        this.firstname = response.data.firstname
        this.surname = response.data.surname
        console.log(response.data)
      }).catch(error => {
        console.log("L'utilisateur " + this.userId + " n'a pas été trouvé:" +  error)
        this.errorMessage = "L'utilisateur n'a pas été trouvé"
      })
  },
  props: {
    errorMessage: {
      type: String,
      default: ""
    },
    // userId: {
    //   type: Number,
    //   default: localStorage.getItem("userId")
    // }
  },

  methods: {
    updateUser() {
      if(this.firstname != "" && this.surname != "" ) {
          const user = {firstname: this.firstname, surname: this.surname}
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
  }
}
</script>

<style scoped>
  .account {
    margin: 2em auto;
  }
  .ligform {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .bouton {
    margin-right: 1em;
  }
  .error { color: tomato; }
</style>  