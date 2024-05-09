<template>
    <section @click="closeWindow">
    <Transition name="fade">
      <div class="mainWrapper" @click.stop v-if="postData?.length">
        <div class="swiper" >
         <Swiper :modules="[Pagination]" :grabCursor="true" :pagination="{ clickable: true, }">
                <SwiperSlide v-for="post in postData" :key="post">
                    <img :src="post" alt="Not found" loading="lazy">
                </SwiperSlide>
         </Swiper>
        </div>
        <div class="closeButton">
            <button @click="closeWindow">></button>
        </div>
      </div>
    </Transition>
    </section>
    <GlobalSpinner v-if="pageLoading" style="background-color: rgba(0, 0, 0, 0.05);"></GlobalSpinner>

</template>
  

<script setup>
    import { defineProps, ref, defineEmits, onMounted } from 'vue';
    import fetchService from '../services/fetchService';
    import GlobalSpinner from '../global/GlobalSpinner.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import {  Pagination } from 'swiper/modules';
    import 'swiper/css/effect-cube';
    import 'swiper/css/pagination'
    import 'swiper/css';

    const props = defineProps({
        postId: String
    });

    const emits = defineEmits(['close-window']);
    const postData = ref([]);
    const pageLoading = ref(true);

    async function getPost(){
        const response = await fetchService.get(`/social_media/posts/${props.postId}`);
        postData.value = response.data.post.images
        pageLoading.value = false
    }
   
    function closeWindow(){
        postData.value = [];
        setTimeout(() => {
            emits('close-window')
        }, 400);
    }

    onMounted(() => {
        getPost()
    })
</script>

<style scoped>
    section {
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 13;
    }
    .mainWrapper {
        width: 750px;
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        transition: all 0.3s;
    }
    .swiper {
        width: 100%;
        height: 100%; 
        overflow: hidden; 
    }
    .swiper img {
        border-radius: 10px;
        width: 100%; 
        height: 100%; 
        object-fit: cover; 
    }
    .closeButton button {
        position: absolute;
        top: 5%;
        right: 5%;
        width: 40px; 
        height: 40px; 
        background-color: rgba(0, 123, 255, 0.4); 
        border: none;
        color: white; 
        font-size: 20px;
        font-weight: 600;
        border-radius: 50%; 
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0; 
        outline: none; 
        transition: background-color 0.3s ease; 
        transform: rotate(90deg);
        z-index: 3;
    }

    .closeButton button:hover {
        background-color: rgba(0, 123, 255, 0.7); 

    }

    .fade-enter-from, .fade-leave-to{
        opacity: 0;
        transform: scale(0.7);
    }
    .fade-enter-active, .fade-leave-active{
        transition: all 0.4s ease;
    }
    .fade-enter-to, .fade-leave-from{
        opacity: 1;
        transform: scale(1);
    }

    @media(min-width: 319px){
        .mainWrapper{
            width: 350px;
            height: 350px;
        }
    }
    @media(min-width: 424px){
        .mainWrapper{
            width: 400px;
            height: 400px;
        }
    }
    @media(min-width: 500px){
        .mainWrapper{
            width: 550px;
        height: 550px;
        }
    }
    @media(min-width: 1000px){
        .mainWrapper{
            width: 750px;
            height: 500px;
        }
    }
   
</style>