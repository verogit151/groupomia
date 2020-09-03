<template>
    <div>
        <b-row>
            <b-col cols=6 id="login">
                <h2>Connexion</h2>
                    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                    <b-row>
                        <b-col cols=4><input type="text" name="email" v-model="input.email" placeholder="Email" /></b-col>
                        <b-col cols=4><input type="password" name="password" v-model="input.password" placeholder="Mot de passe" /></b-col>
                        <b-col cols=4><b-button type="button" v-on:click="login()">Se connecter</b-button></b-col>
                    </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios'

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
                    axios.post("http://localhost:3000/api/auth/login/", {  user:user 
                    }).then(response => {
                        this.userId = response.data.userId
                        this.roleId = response.data.roleId
                        this.$emit("authenticated", true)
                        this.$router.replace({ name: "home" })
                        localStorage.setItem("userId",this.userId)
                        localStorage.setItem("roleId",this.roleId)
                    }).catch(() => {
                        console.log("incorrect")
                        this.errorMessage = "L'email et/ou le mot de passe est incorrect"
                    })
                } else {
                    console.log("A email and password must be present")
                    this.errorMessage = "L'email et/ou le mot de passe est incorrect"
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
    .error { color: tomato; }
</style>