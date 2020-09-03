import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "../views/login.vue"
import SignupComponent from "../views/signup.vue"
import HomeComponent from "../views/home.vue"
import AccountComponent from "../views/account.vue"
import UsersComponent from "../views/users.vue"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {
            name: "login"
        }
    },
    {
        path: "/login",
        name: "login",
        component: LoginComponent
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupComponent
    },
    {
        path: "/home",
        name: "home",
        component: HomeComponent
    },
    {
        path: "/account",
        name: "account",
        component: AccountComponent
    },
    {
        path: "/users",
        name: "users",
        component: UsersComponent
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
  })
  
  export default router
  