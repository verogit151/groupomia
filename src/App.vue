<template>
    <div class="app">
        <b-container fluid>
            <b-row>
                <b-col>
                    <div class="nav" v-if="authenticated">
                        <router-link to="/home"><img src="./assets/Groupomia_Logos/icon-left-font-monochrome-black.svg" alt="Logo Groupomia"/></router-link>
                        <span class="menu"> 
                            <router-link to="/account">Mon compte</router-link><span class="navmenu_sep"> | </span>
                            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Se déconnecter</router-link>
                        </span>
                    </div>
                    <div class="nav" v-else>
                        <img src="./assets/Groupomia_Logos/icon-left-font-monochrome-black.svg" alt="Logo Groupomia"/>
                        <span class="menu"> 
                            <router-link to="/signup">Inscription</router-link><span class="navmenu_sep"> | </span>
                            <router-link to="/login">Connexion</router-link>
                        </span>
                    </div>
                </b-col>
            </b-row>
            <router-view @authenticated="setAuthenticated" /> 
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" })
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status
            },
            logout() {
                this.authenticated = false
            }
        }
    }
</script>

<style>
    body {
        font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        font-size: 1rem;
        background-color: #F0F0F0;
        padding: 0;
        margin: 0;
    }
    a {
        color:rgb(34, 34, 34) !important;
    }
    a:hover {
        color: #fd2d01;
    }
    .app {
        width: 100%;
        margin: auto;
    }
    .nav {
        border-bottom: rgb(34, 34, 34) 2px solid;
    }
    .nav img {
        max-width: 255px;
        margin-left: 2em;
        padding: 1em;
    }
    .menu {
        font-size: 1.2em;
        margin: 1em 0.7em auto auto;
    }
    .menu_sep {
        margin-left: 0.5em;
        margin-right: 0.5em;
    }
</style>