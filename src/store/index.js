import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex, axios)

export default new Vuex.Store({
	state: {
		posts: [],
		users: [],
		token: localStorage.getItem('token') || ''
	},
	actions: {
		loadPosts({commit}, userId) {
			axios.get("http://localhost:3000/api/articles/" + userId,
                ).then(response => {
                    let posts = response.data
					commit('SET_POSTS', posts)
				}).catch(error => {
					console.log(error)
				})
		},
		login({commit}, user) {
			return new Promise((resolve, reject) => {
				axios.post("http://localhost:3000/api/auth/login/", {  user:user 
				}).then((response) => {
					let users = response.data
					const token = response.data.token
					localStorage.setItem('token',token)
					axios.defaults.headers.common['Authorization'] = token
					commit('SET_USERS', users)
					resolve(response)
				}).catch((error) => {
					localStorage.removeItem('token')
					console.log(error)
					reject(error)
				})
			})
		},
		signup({commit}, user) {
			return axios.post("http://localhost:3000/api/auth/signup/", {  user:user 
                }).then(response => {
					let users = response.data
					commit('SET_USERS', users)
				}).catch(error => {
					console.log(error)
				})
		}
	},
	mutations: {
		SET_POSTS(state, posts) {
			state.posts = posts
		},
		SET_USERS(state, users) {
			state.users = users
		},
	}
})