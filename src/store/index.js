import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex, axios)

export default new Vuex.Store({
	state: {
		posts: [],
		comments: []
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
		},
		loadComments({commit}, article) {
			const articleId = article.articleId
			console.log("article" + articleId)
			axios.get("http://localhost:3000/api/articles/comments/" + articleId
                ).then(response => {
					let comments = response.data
					console.log(JSON.parse(JSON.stringify(comments)))
                    commit('SET_COMMENTS', comments)
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
		},
		SET_COMMENTS(state, comments) {
			state.comments = comments
		}
	}
})