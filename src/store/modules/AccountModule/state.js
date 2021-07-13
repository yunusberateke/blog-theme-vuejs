const state = () => {
    return{
        user : localStorage.getItem("user"),
        access_key : localStorage.getItem("access_key")
    }
}

export default state;
