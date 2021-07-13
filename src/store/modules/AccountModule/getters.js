export default {
    isLoggedIn(state){
        return state.user && state.access_token
    }
}