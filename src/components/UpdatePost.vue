<template>
    <section class="createContainer" @click="closeWindow">
        <Transition name="event">
        <div class="contentContainer" v-if="windowVisible" @click.stop>
            <div class="title">
                <div class="btnClose">
                    <button @click="closeWindow">Close</button>
                </div>
                <div>
                    <h2>Create new post!</h2>
                </div>
                <div class="btnDone">
                    <button @click="updatePost">Done</button>
                </div>
            </div>
            <div class="showImages">
                <div class="firstImage" v-for="(image, index) in postData.images" :key="index">
                    <div class="img">
                        <img :src="image" :alt="'Current img ' + (index + 1)">
                    </div>
                    <div class="text">
                        <p>Current Img {{index + 1}}</p>
                    </div>
                </div>
            </div>
            <div class="currentTitle">
                <div class="cTitle">
                    <p>Title - </p>
                    <h3  v-if="postInputData.title.value === ''">{{ postData.title }}</h3>
                    <h3 v-else>{{ postInputData.title.value }}</h3>
                </div>
                <div class="cDesc">
                    <p>Current Desc - </p>
                    <p v-if="postInputData.desc.value === ''">{{ postData.description }}</p>
                    <p>{{ postInputData.desc.value }}</p>
                </div>
            </div>
            <div class="inputSection" >
                <div class="inputBox" :class="{wrong : postInputData.img1.invalid}">
                    <label for="img1">Update first image</label>
                    <input type="text" id="img1" placeholder="http://" v-model="postInputData.img1.value" @blur="postInputData.img1.invalid = false">
                </div>
                <div class="inputBox"  >
                    <label for="img2">Update second image</label>
                    <input type="text" id="img2" placeholder="http://" v-model="postInputData.img2.value">
                </div>
                <div class="inputBox">
                    <label for="postTitle">Update Title</label>
                    <input type="text" id="postTitle" placeholder="Title..." v-model="postInputData.title.value">
                </div>
                <div class="inputBox">
                    <label for="postDesc">Update Description</label>
                    <input type="text" id="postDesc" placeholder="Description..." v-model="postInputData.desc.value">
                </div>
                <div class="postButton">
                    <GlobalButton @click="updatePost" title="Update post!"></GlobalButton>
                </div>
            </div>
        </div>
    </Transition>
    <GlobSucces v-if="showSuccess"></GlobSucces>
    <GlobFail v-if="showFail"></GlobFail>
    </section>
</template>

<script setup>
    import { reactive, defineProps, onMounted, ref, defineEmits} from 'vue'; 
    import fetchService from '../services/fetchService';
    import GlobalButton from '../global/GlobalButton.vue';
    import GlobSucces from '../global/GlobSucces.vue';
    import GlobFail from '../global/GlobFail.vue';
    import { useStore } from 'vuex';
    const store = useStore();
    // import { useStore } from 'vuex/types/index.js';
    // const store = useStore();

    const props = defineProps({
        postID: String
    })
    const emits = defineEmits(['close-event', 'recieve-post']); 
    const postData = ref([]);
    const windowVisible = ref(null);
    const showSuccess = ref(false);
    const showFail = ref(false)
    const postInputData = reactive({
            img1: {
                value: '',
                invalid: false,
            },
            img2: {
                value: '',
            },
            title: {
                value: '',
            },
            desc: {
                value: '',
            }
    })

async function updatePost(){
    let images = postInputData.img2.value ? [postInputData.img1.value, postInputData.img2.value] : [postInputData.img1.value];

    if(!postInputData.img1.value){
        //note that images must be an array
        images = [postData.value.images[0]] 
    }

    const body = {
        title: postInputData.title.value.trim() ? postInputData.title.value : postData.value.title,
        description: postInputData.desc.value.trim() ? postInputData.desc.value : postData.value.description,
        images: images
    }
    const response = await fetchService.patch(`/social_media/posts/${props.postID}`, body);
    
    if(response !== undefined){
        store.dispatch('findPostAndUpdate', response.data.post);
        windowVisible.value = false;
        setTimeout(() => {
            showSuccess.value = true
        }, 400);
        setTimeout(() => {
            emits('close-event')
        }, 2000);
    }else{
        emits('close-event')
        alert('Something went wrong! Please try again :(')
    }
}

async function getPost(){
    const response = await fetchService.get(`/social_media/posts/${props.postID}`);
    postData.value = response.data.post;
    console.log(postData.value);
}

function showWindow(){
    windowVisible.value = true;
}
function closeWindow(){
        windowVisible.value = false;

        setTimeout(() => {
            emits('close-event')
        }, 400);
    }

onMounted(() => {
    getPost();
    showWindow();
})
</script>

<style scoped>
    section{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .contentContainer{
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.8);
        transition: 0.3s all;
    }
    
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title button{
        padding: 8px 16px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        font-weight: 600;
        background-color: transparent;
        color: #007bff;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .showImages{
        display: flex;
        justify-content: center;
        align-content: center;
        margin: 20px auto;
        gap: 20px;
    }
    .showImages .img img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .inputBox{
        display: flex;
        flex-direction: column;
    }
    .inputBox input{
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .inputBox input:focus {
        outline: none;
        border-color: #6d6dff;
        box-shadow: 0 0 5px rgba(109, 109, 255, 0.5);
    }

    .inputSection{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .inputSection label{
        font-weight: 600;
        font-size: 17px;
    }
    .inputSection input{
        padding: 10px;
    }
    .postButton{
        display: flex;
        justify-content: center;
    }
    .currentTitle{
        margin-bottom: 15px;
        border: 1px solid #007bff;
        padding: 10px;
        border-radius: 10px;
    }
    .currentTitle p, h3{
        display: inline;
    }
   
    /* transition */
    .event-enter-from, .event-leave-to{
        transform: scale(0.7);
        opacity: 0;
    }
    .event-enter-active, .event-leave-active{
        transition: all 0.3s ease;
    }
    .event-enter-to, .event-leave-from{
        transform: scale(1);
        opacity: 1;
    }
    .wrong input{
        border: 1px solid red;
    }
    @media (min-width: 374px){
        .contentContainer{
            width: 350px;
        }
        .showImages .img{
            width: 150px;
            height: 150px;
        }
        .currentTitle{
            font-size: 14px;
        }
        .title h2{
            font-size: 17px;
        }
        .title button{
            font-size: 14px;
        }
    }
    @media (min-width: 424px){
        .contentContainer{
            width: 380px;
        }
    }
    @media (min-width: 767px){
        .contentContainer{
            width: 700px;
        }
        .showImages .img{
        width: 200px;
        height: 200px;
        }
        .showImages{
            margin: 0px auto;
        }
        .currentTitle{
            font-size: 15px;
        }
        .title h2{
            font-size: 20px;
        }
        .title button{
            font-size: 16px;
        }
    }
    @media (min-width: 1200px){
        .showImages .img{
        width: 250px;
        height: 250px;
        }
        .showImages{
            margin: 20px auto;
        }
    }
</style>