<template>
<div>
    <div id="app">
        <b-row>
            <b-col cols=12 md=7 xl=5 id="signup">
                <h2>Inscription</h2>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                <b-row>
                    <b-col cols=12 md=4><label for="firstname">Prénom *</label></b-col>
                    <b-col cols=12 md=8><input type="text" name="firstname" v-model="input.firstname" /></b-col>
                </b-row>
                <b-row>
                    <b-col cols=12 md=4><label for="surname">Nom *</label></b-col>
                    <b-col cols=12 md=8><input type="text" name="surname" v-model="input.surname" /></b-col>
                </b-row>
                <b-row>
                    <b-col cols=12 md=4><label for="email">Email *</label></b-col>
                    <b-col cols=12 md=8><input type="email" name="email" v-model="input.email" /></b-col>
                </b-row>
                <b-row>
                    <b-col cols=12 md=4><label for="password">Mot de passe *</label></b-col>
                    <b-col cols=12 md=8><input type="password" name="password" v-model="input.password" /></b-col>
                </b-row>
                <b-row id="bouton">
                    <b-col><b-button type="button" v-on:click="signup()">S'inscrire</b-button></b-col>
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
        name: 'signup',
        data() {
            return {
                input: {
                    firstname: "",
                    surname: "",
                    email: "",
                    password: ""
                }
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
            signup(){
                if(this.input.firstname != "" && this.input.surname != "" && this.input.email != "" && this.input.password != "") {
                    const user = {
                        firstname: this.input.firstname, 
                        surname: this.input.surname,
                        email: this.input.email, 
                        password: this.input.password
                    }
                    this.$store.dispatch('signup', user)
                    .then(() => {
                         this.$emit("authenticated", true)
                        this.$router.replace({ name: "home" })
                    }).catch(() => {
                        this.errorMessage = "Les informations sont incorrectes"
                    })
                }
                else {
                    this.errorMessage = "Tous les champs sont obligatoires"
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
    #signup {
        border-radius: 2em;
        box-shadow: 0 0 20px 1px rgb(119, 118, 118);
        color: white;
        background-color: rgb(128, 1, 1);
        margin: 5% auto auto auto;
        padding: 2em;
        text-align: left;
    }
    .row {
        margin-top: 0.5em;
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
        text-align: left;
        /* display: inline-block; */
    }
    #bouton {
        float: right;
        margin: 0.5em !important;
    }
    /* .btn {
        border-radius: 0.5em;
    } */
    .error { color: tomato; }

    @media all and (max-width: 768px) {
        h2 {
            font-size: 1.5rem;
        }
    }
</style>