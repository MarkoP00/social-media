<template>
    <GlobalSpinner v-if="spinnerIsActive" style="z-index: 13" > </GlobalSpinner>
    <section v-if="success === false" style="z-index: 11;">
        <GlobFail></GlobFail>
    </section>
    <section v-if="success">
        <GlobSucces v-if="success"></GlobSucces>
    </section>
    <section v-else class="createContainer" @click="closeEvent">
        <Transition name="event">
        <div class="contentContainer" @click.stop v-if="windowVisible">
            <div class="title">
                <div class="btnClose">
                    <button @click="closeEvent">Close</button>
                </div>
                <div>
                    <h2>Create new post!</h2>
                </div>
                <div class="btnDone">
                    <button @click="createPost">Done</button>
                </div>
            </div>
            <div class="showImages">
                <div class="firstImage">
                    <div class="img">
                        <img v-if="postInputData.img1.value === ''" src="https://t4.ftcdn.net/jpg/05/78/68/09/360_F_578680944_Imu2UgxdmxGJWGpU5phGBiv4AXbGRA4R.jpg" alt="Fall back picture">
                        <img v-else :src="postInputData.img1.value" alt="First image link(https://)">
                    </div>
                    <div class="text">
                        <p>Image 1</p>
                    </div>
                </div>
                <div class="secondImage">
                    <div class="img">
                        <img v-if="postInputData.img2.value === ''" src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/135431787/original/35ddcc28c576cafcd277b237aaeeb3939701ae5d/draw-soft-and-cute-cartoon-animals.jpg" alt="Second uploaded image">
                        <img v-else :src="postInputData.img2.value" alt="First uploaded image">
                    </div>
                    <div class="text">
                        <p>Image 2</p>
                    </div>
                </div>
            </div>
            <div class="inputSection">
                <div class="inputBox" :class="{wrong : postInputData.img1.invalid === true}" >
                    <label for="img1">First image source (URL)</label>
                    <input type="text" id="img1" placeholder="http://" v-model="postInputData.img1.value" @blur="postInputData.img1.invalid = false">
                </div>
                <div class="inputBox">
                    <label for="img2">Second image source (URL)</label>
                    <input type="text" id="img2" placeholder="http:// (You can leave this one empty)" v-model="postInputData.img2.value">
                </div>
                <div class="inputBox" :class="{wrong : postInputData.title.invalid === true}" >
                    <label for="postTitle">Post Title</label>
                    <input type="text" id="postTitle" maxlength="18" placeholder="Title..." v-model="postInputData.title.value" @blur="postInputData.title.invalid = false">
                </div>
                <div class="inputBox" :class="{wrong : postInputData.desc.invalid === true}" >
                    <label for="postDesc">Post Description</label>
                    <input type="text" id="postDesc" placeholder="Description..." v-model="postInputData.desc.value" @blur="postInputData.desc.invalid = false">
                </div>
                <div class="postButton">
                    <GlobalButton @click="createPost" title="Create!"></GlobalButton>
                </div>
            </div>
        </div>
    </Transition>
    </section>
</template>

<script setup>
    import { reactive,ref, defineEmits, onMounted } from 'vue';
    import GlobalButton from '../global/GlobalButton.vue';
    import fetchService from '../services/fetchService';
    import GlobSucces from '../global/GlobSucces.vue';
    import GlobFail from '../global/GlobFail.vue';
    import GlobalSpinner from '../global/GlobalSpinner.vue';
    import { useStore } from 'vuex';

    const emits = defineEmits(['close-event']);
    const store = useStore();
    const spinnerIsActive = ref(false);
    const windowVisible = ref(null);
    const success = ref(null);

    const postInputData = reactive({
        img1: {
            value: '',
            invalid: false
        },
        img2: {
            value: '',
        },
        title: {
            value: '',
            invalid: false
        },
        desc: {
            value: '',
            invalid: false
        }
    })

    function validateInputFields(){
    Object.keys(postInputData).forEach((key) => {
        if(postInputData[key].value === ''){
            postInputData[key].invalid = true;
        }else if(postInputData[key].value.length < 5){
            postInputData[key].invalid = true;
        }else if(key === 'img1' && postInputData[key].value.includes('http://')){
            postInputData[key].invalid = true;
        }else{
            postInputData[key].invalid = false;
        }
    })
}

    async function createPost(){
        validateInputFields()
        spinnerIsActive.value = true;
        
    const inputInvalid = Object.keys(postInputData).filter(key => key !== 'img2').some(key => postInputData[key].invalid); 

        if(inputInvalid){
            spinnerIsActive.value = false;
            return;
        }

        const images = postInputData.img2.value ? [postInputData.img1.value, postInputData.img2.value] : [postInputData.img1.value];

        const body = {
            title: postInputData.title.value,
            description: postInputData.desc.value,
            images: images, 
            id: 11
        };
        const post = await fetchService.post('/social_media/posts', body);
        console.log(post);
        if(post){
            spinnerIsActive.value = false; 

            store.dispatch('addPost', post.data.post);
            store.dispatch('updateSingleUserPostData', post.data.post)

            windowVisible.value = false;
            setTimeout(() => {
                success.value = true;
            }, 400);

            setTimeout(() => {
                emits('close-event')
            }, 2400);
        }else{
            spinnerIsActive.value = false;
            windowVisible.value = false;
            
            setTimeout(() => {
                success.value = false;
            }, 600);

            setTimeout(() => {
                emits('close-event')
            }, 2400);
        }

    }

    function openEvent(){
        windowVisible.value = true
    }

    function closeEvent(){
        windowVisible.value = false;

        setTimeout(() => {
            emits('close-event')
        }, 400);
    }


    onMounted(() => {
        openEvent()
    })
</script>

<style scoped>
    section{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.4);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 12;
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
    .title button:hover{
        background-color: #f0f0f0;
    }
    .showImages{
        display: flex;
        justify-content: center;
        align-content: center;
        margin: 20px auto;
        gap: 40px;
    }
    .showImages .text{
        text-align: center;
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
    
    .inputSection{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .inputSection label{
        font-weight: 600;
        font-size: 17px;
    }
    .inputSection input{
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        margin-top: 5px;
    }
    .inputSection input:focus{
        outline: none;
        border-color: #6d6dff;
        box-shadow: 0 0 5px rgba(109, 109, 255, 0.5);
    }
    .postButton{
        display: flex;
        justify-content: center;
    }

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
        .title h2{
            font-size: 17px;
        }
        .title button{
            font-size: 14px;
        }
        .contentContainer{
            width: 350px;
        }
        .showImages .img{
            width: 150px;
            height: 150px;
        }
    }
    @media (min-width: 424px){
        .contentContainer{
            width: 380px;
        }
    }
    @media (min-width: 767px){
        .title h2{
            font-size: 20px;
        }
        .title button{
            font-size: 16px;
        }
        .contentContainer{
            width: 700px;
        }
        .showImages .img{
        width: 200px;
        height: 200px;
    }
    }

   
</style>