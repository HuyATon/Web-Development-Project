import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

export default createStore({
    state: {
        isAuthenticated: false,
        user: null,
        cart: {
            _id: null,
            customerID: null,
            entries: []
        },
    },
    mutations: {
        setAuthenticated: (state, isAuthenticated) => {
            state.isAuthenticated = isAuthenticated
        },
        setUser: (state, user) => {
            state.user = user
        },

        //  Cart mutations
        setQuantity: (state, { product, quantity }) => {
            const oldProduct = state.cart.entries.find(entry => { return entry.product._id === product._id })
            if (oldProduct) {
                oldProduct.quantity = quantity
            }
            state.cart.entries = state.cart.entries.filter(entry => entry.quantity > 0)
        },
        setCart: (state, cart) => {
            state.cart = cart
        },
        addToCart: (state, product) => {
            const oldProduct = state.cart.entries.find(entry => { return entry.product._id === product._id })
            if (oldProduct) {
                oldProduct.quantity++
            }
            else {
                state.cart.entries.push({ product, quantity: 1 })
            }
        },
        removeFromCart: (state, product) => {
            state.cart.entries = state.cart.entries.filter(entry => entry.product._id !== product._id)
        }
    },
    actions: {
        // Cart actions
        setCart( { commit }, cart ) {
            commit('setCart', cart)
        },
        async addToCart( { commit, getters, dispatch }, product ) {
            // client update
            commit('addToCart', product)
            if (getters.cartDidSave) {          
                // server update
                const cart = getters.cart
                const newQuantity = cart.entries.find(entry => entry.product._id === product._id).quantity || 1
                await axios.patch('/cart', {
                    product: product,
                    quantity: newQuantity
                })
             }
             alert('Added to cart')
        },
        async updateCart( { commit, getters, dispatch }, { product, quantity }) {
            // client update
            commit('setQuantity', { product, quantity })
            // server update
            if (getters.cartDidSave) {
                await axios.patch('/cart', {
                    product: product,
                    quantity: quantity // 0 when deleting
                })
            }
        },
        async setUser( { commit }, user ) {
            commit('setUser', user)
            // server update
        },
        async loadCart({ commit, getters }) {
            try {
                const response = await axios.get('/cart')
                const data = response.data
                if (data.success) {
                    const fetchedCart = data.data.cart
                    const cart = {
                        _id: fetchedCart._id,
                        customer: fetchedCart.customer,
                        entries: fetchedCart.entries
                    }
                    commit('setCart', cart)
                }
                else { // user has no cart
                    const currentEntries = getters.cart.entries.map(entry => {
                        return {
                            product: entry.product._id,
                            quantity: entry.quantity
                        }
                    })
                    await axios.post('/cart', { entries: currentEntries })
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        user: state => state.user,
        cart: state => state.cart,
        cartTotal: state => {
            if (!state.cart.entries) { return 0 }
            return state.cart.entries.reduce((total, entry) => {
                return total + entry.product.price * entry.quantity
            }, 0)
        },
        cartDidSave: state => {
            return state.cart._id !== null
        }
    },
    plugins: [createPersistedState()]
})