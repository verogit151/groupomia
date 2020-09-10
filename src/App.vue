<template>
  <div class="app">
    <b-container fluid>
      <b-row>
        <b-col class="menubar">
          <div class="nav" v-if="authenticated">
            <!-- <router-link to="/home"> -->
              <img
                src="./assets/Groupomia_Logos/icon-left-font-monochrome-black.svg"
                alt="Logo Groupomia"
              />
            <!-- </router-link> -->
            <span class="menu">
              <router-link to="/home" class="navmenu">Les articles</router-link>
              <router-link v-if="users.roleId===1" to="/users" class="navmenu">Les utilisateurs</router-link>
              <router-link to="/account" class="navmenu">Mon compte</router-link>
              <router-link
                v-if="authenticated"
                to="/login"
                v-on:click.native="logout()"
                replace
                class="navmenu"
              >Se déconnecter</router-link>
            </span>
          </div>
          <div class="nav" v-else>
            <img
              src="./assets/Groupomia_Logos/icon-left-font-monochrome-black.svg"
              alt="Logo Groupomia"
            />
            <span class="menu">
              <router-link to="/signup" class="navmenu">Inscription</router-link>
              <router-link to="/login" class="navmenu">Connexion</router-link>
            </span>
          </div>
        </b-col>
      </b-row>
      <router-view @authenticated="setAuthenticated" />
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from "vuex"

export default {
  name: "App",
  data() {
    return {
      authenticated: false,
    //   userId: localStorage.getItem("userId"),
    //   roleId: localStorage.getItem("roleId"),
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" })
    } 
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status
    },
    logout() {
      this.authenticated = false
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
  }, 
  computed: {
    ...mapState(['users']),
  }
}
</script>

<style>
body {
  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif;
  font-size: 1rem;
  background-color: rgb(245, 245, 245) !important;
  padding: 0;
  margin: 0;
}
.container-fluid {
  padding: 0 !important;
}
.row {
  margin: 0 !important;
}
a {
  color: rgb(34, 34, 34) !important;
}
.app {
  width: 100%;
}
.menubar {
  border-bottom: rgb(128, 127, 127) 1px solid;
}
.nav img {
  max-width: 255px;
  margin-left: 2em;
  padding: 1em;
}
.nav p {
  float: right;
}
.menu {
  font-size: 1.2em;
  margin: 1em 0.7em auto auto;
}
.navmenu {
  color: rgb(34, 34, 34);
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.routeur-like-active {
  text-decoration: underline;
}
footer {
  font-size: 0.1rm;
  font-weight: bold;
}
@media all and (max-width: 768px) {
	.menu {
        font-size: 1em;
    }
}
@media all and (max-width: 505px) {
	.menu {
        font-size: 0.7em;
    }
}
</style>