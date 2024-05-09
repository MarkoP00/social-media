import { createStore } from "vuex";

const store = createStore({
    state(){
        return{
            postData: [],
            allUsers: [],
            singleUser: [],
            singleUserPostData: []
        }
    },
    mutations:{
        collectData(state, payload){
            state.postData = payload
        },
        collectUsers(state,payload){
            state.allUsers = payload
        },
        collectSingleUser(state,payload){
            state.singleUser = payload
        },
        updateSingleUserPostData(state,payload){
            state.singleUserPostData = payload
        },
        addPost(state,payload){
            state.postData.push(payload)
        },
        commitUserChanges(state, payload) {
            const userIndex = state.allUsers.findIndex(user => user.id === payload.id.userId);
            console.log(payload);
            if (userIndex !== -1) {
                state.allUsers[userIndex].profile_picture = payload.profile_picture;
                state.allUsers[userIndex].username = payload.username;
            } else {
                console.error('User not found with id:', payload.id);
            }
        },
        findPostAndUpdate(state,payload){
            state.postData.forEach((post, index) => {
                if (post.id === payload.id) {
                    state.postData[index] = payload;
                }
            });
        },
        findUser(state,payload){
            state.allUsers.forEach((user) => {
                if(user.id === payload.id){
                    console.log('found id');
                }
            })
        },
    },
    getters:{
        getData(state){
            return state.postData
        },
        checkUserChanges(state){
            return state.allUsers
        },
        checkSingleUserChanges(state){
            return state.singleUser.username
        },
        checkSUProfilePicture(state){
            return state.singleUser.profile_picture
        },
        checkSingleUserPostData(state){
            return state.singleUserPostData
        }
    },
    actions: {
        collectData(context, payload){
            context.commit('collectData', payload)
        },
        collectUsers(context, payload){
            context.commit('collectUsers', payload)
        },
        collectSingleUser(context, payload){
            context.commit('collectSingleUser', payload)
        },
        addPost(context,payload){
            context.commit('addPost', payload)
        },
        commitUserChanges(context, payload){
            context.commit('commitUserChanges', payload)
        },
        findPostAndUpdate(context, payload){
            context.commit('findPostAndUpdate', payload)
        },
        findUser(context, payload){
            context.commit('findUser', payload)
        },
        updateSingleUserPostData(context,payload){
            context.commit('updateSingleUserPostData', payload)
        },
    }
})


export default store;