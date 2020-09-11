<template>
<div>
    <div id="app">
        <b-row>
            <b-col cols=10 md=7 xl=5 id="login">
                <h2>Connexion</h2>
                    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                    <b-row>
                        <b-col cols=12 md=4><label for="email">Email</label></b-col>
                        <b-col cols=12 md=8><input type="text" id="email" name="email" v-model="input.email" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col cols=12 md=4><label for="password">Mot de passe</label></b-col>
                        <b-col cols=12 md=8><input type="password" id="password" name="password" v-model="input.password" /></b-col>
                    </b-row>
                    <b-row id="bouton">
                        <b-col>
                            <b-button type="button" v-on:click="login()">Se connecter</b-button>
                        </b-col>
                    </b-row>
            </b-col>
        </b-row>
    </div>
    <footer>© Groupomania * 2020</footer>
</div>
</template>

<script>
import {mapState} from "vuex"

export default {
        name: 'Login',
        data() {
            return {
                input: {
                    email: "",
                    password: "",
                    userId: null
                },
            }
        },
        props: 
            {
            errorMessage: {
                type: String,
                default: ""
            }
        },
        methods: {
            login() {
                if(this.input.email != "" && this.input.password != "") {
                   const user = {email: this.input.email, password: this.input.password}
                   this.$store.dispatch('login', user)
                    .then(() => {
                         this.$emit("authenticated", true)
                        this.$router.replace({ name: "home" })
                    }).catch((error) => {
                        console.log(error)
                        this.$emit("authenticated", false)
                        this.errorMessage = "L'email et/ou le mot de passe est incorrect"
                    })
                } else {
                    this.$emit("authenticated", false)
                    this.errorMessage = "L'email et/ou le mot de passe est incorrect"
                }
            }
        },
        computed: {
            ...mapState(['users']),
        }
    }
</script>

<style scoped>
    h2 {
        font-size: 2rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    #login {
        border-radius: 2em;
        box-shadow: 0 0 20px 1px rgb(119, 118, 118);
        color: white;
        background-color: rgb(128, 1, 1);
        margin: 5% auto auto auto;
        padding: 2em;
        text-align: left;
    }
    .row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }
    input, select {
        width: 100%;
        padding: 0.2em;
        box-sizing: border-box;
        resize: vertical;
        border-radius: 0.5em;
    }
    label {
        padding: 0.2em 0.2em 0.2em 0;
        display: inline-block;
    }
    #bouton {
        float: right;
        margin: 0.5em !important;
    }
    .error { color: tomato; }

    @media all and (max-width: 768px) {
        h2 {
            font-size: 1.5rem;
        }
    }
</style>