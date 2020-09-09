<template>
  <b-row id="users">
    <b-col cols=6 class="listusers">
      <h1>Les utilisateurs</h1>
        <b-row>
            <b-col cols=2></b-col>
            <b-col cols=4>Nom</b-col>
            <b-col cols=4>Email</b-col>
            <b-col cols=2></b-col>
        </b-row>
      <p v-for="(item) in user" :key="item.id" class="edituser">
          <b-row>
              <b-col cols=2><Avatar :username="`${item.firstname} ${item.surname}`" :size="25"></Avatar></b-col>
              <b-col cols=4>{{ item.surname }} {{ item.firstname }}</b-col>
              <b-col cols=4>{{ item.email }}</b-col>
              <b-col cols=2>
                <b-icon icon="trash" v-if="users.roleId===1" font-scale="0.8" @click="deleteUser(item.id)" class="trash"></b-icon>
              </b-col>
          </b-row>
      </p>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios' 
import Avatar from 'vue-avatar'
import { mapState } from "vuex"

export default {
    name: "users",
    data() {
        return {
            user: []
        }
    },
    mounted() {
      this.listUsers() 
    },
    methods: {
      // Affichage de la liste des utilisateurs
      listUsers() {
        axios.get("http://localhost:3000/api/auth/", 
        ).then(response => {
            this.user = response.data
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
      },
      // Suppression d'un utilisateur
      deleteUser(userId) {
        axios.delete("http://localhost:3000/api/auth/" + userId, 
          ).then(() => {
              this.listUsers()
              console.log("utilisateur supprimé")
          }).catch(() => {
              this.errorMessage = "NOK !!!"
          })
      },
    },
    components: {  Avatar },  
    computed: {
      ...mapState(["users"]),
    },
}
</script>

<style scoped>
  #users {
    color: #2c3e50;
    background-color: rgb(245, 245, 245);
  }
  .listusers {
    margin: 2em auto;
  }
  .edituser {
    background-color: white;
    border: rgb(95, 95, 95) 1px solid;
    border-radius: 2em;
    padding: 0.3em;
    margin: 0.2em;
    text-align: left;
  }
</style>