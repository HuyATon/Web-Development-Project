import { createStore } from 'vuex'


export default createStore({
    state: {
        isAuthenticated: false,
        user: null
    },
    mutations: {
        setAuthenticated: (state, isAuthenticated) => {
            state.isAuthenticated = isAuthenticated
        },
        setUser: (state, user) => {
            state.user = user
        }
    },
    actions: {

    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        user: state => state.user
    }
})