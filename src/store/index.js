import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex, axios)

export default new Vuex.Store({
	state: {
        posts: []
    },
	actions: {
		loadPosts({commit}) {
			axios.get("http://localhost:3000/api/articles/"
                ).then(response => {
                    console.log(response.data)
                    let posts = response.data
                    commit('SET_POSTS', posts)
                }).catch(error => {
                    console.log(error)
                })
		}
	},
	getters: {
		getArticlesDetails: (state) => {
			return `${state.article.content}`
		}
	},
	mutations: {
		SET_POSTS(state, posts) {
			state.posts = posts
		}
	}
})