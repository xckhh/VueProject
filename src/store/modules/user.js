export default {
    // 相当于vue中的data
    state: {
        user: ''
    },
    // 相当于vue中的计算属性 能拿到state里最新的值，而且能传参 第一个参数就是state
    getters:{
        // 获取state中的user对象
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state,val){
            state.user=val
        }
    },
    actions: {}
}