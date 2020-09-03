<template>
    <b-row>
        <b-col cols=6 id="signup">
            <h2>Inscription</h2>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <b-row>
                <b-col cols=4><label for="firstname">Prénom</label></b-col>
                <b-col cols=4><input type="text" name="firstname" v-model="input.firstname" /></b-col>
            </b-row>
            <b-row>
                <b-col cols=4><label for="surname">Nom</label></b-col>
                <b-col cols=4><input type="text" name="surname" v-model="input.surname" /></b-col>
            </b-row>
            <b-row>
                <b-col cols=4><label for="email">Email</label></b-col>
                <b-col cols=4><input type="email" name="email" v-model="input.email" /></b-col>
            </b-row>
            <b-row>
                <b-col cols=4><label for="password">Mot de passe</label></b-col>
                <b-col cols=4><input type="password" name="password" v-model="input.password" /></b-col>
            </b-row>
            <b-col cols=4><b-button type="button" v-on:click="signup()">S'inscrire</b-button></b-col>
        </b-col>
    </b-row>
</template>

<script>
import axios from 'axios'

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
                const user = {
                    firstname: this.input.firstname, 
                    surname: this.input.surname,
                    email: this.input.email, 
                    password: this.input.password
                }
                axios.post("http://localhost:3000/api/auth/signup/", {  user:user
                }).then(response => {
                        this.userId = response.data.userId
                        this.roleId = response.data.roleId
                        this.$emit("authenticated", true)
                        this.$router.replace({ name: "home" })
                        localStorage.setItem("userId",this.userId)
                        localStorage.setItem("roleId",this.roleId)
                }).catch(() => {
                    console.log("nok")
                    this.errorMessage = "Les informations sont incorrectes"
                }) 
            }
        }
    }
</script>

<style scoped>
    #signup {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>