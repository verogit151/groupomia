<template>
  <div>
    <b-row>
      <b-col cols=6 class="listusers">
        <h1>Les utilisateurs</h1>
          <b-row>
              <b-col cols=4>Nom</b-col>
              <b-col cols=4>Service</b-col>
              <b-col cols=4></b-col>
          </b-row>
        <p v-for="(item) in users" :key="item.id" class="edituser">
            <b-row>
                <b-col cols=4>{{ item.surname }} {{ item.firstname }}</b-col>
                <b-col cols=4>{{ item.email }}</b-col>
                <b-col cols=4>
                  <button type="button" @click="deleteUser(item.id)">Supprimer</button>
                </b-col>
            </b-row>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios' 

export default {
    name: "users",
    data() {
        return {
            users: []
        }
        
    },
    listUsers() {
        axios.get("http://localhost:3000/api/auth/", 
        ).then(response => {
            this.users = response.data
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
    },
    mounted() {
      this.listUsers() 
    },
    methods: {
      listUsers() {
        axios.get("http://localhost:3000/api/auth/", 
        ).then(response => {
            this.users = response.data
        }).catch(() => {
            this.errorMessage = "NOK !!!"
        })
      },
      deleteUser(userId) {
        console.log("suppression de l'utilisateur" + userId)
        axios.delete("http://localhost:3000/api/auth/" + userId, 
          ).then(() => {
              this.listUsers()
              console.log("utilisateur supprimé")
          }).catch(() => {
              this.errorMessage = "NOK !!!"
          })
      },
    }
}
  
</script>

<style scoped>
  .listusers {
    margin: auto;
  }
  
  .edituser {
    border: rgb(95, 95, 95) 1px solid;
    text-align: left;
  }
</style>