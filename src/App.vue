<template>
  <SideMenu @open-create="openCreatePostWindow" v-if="!unwantedRoutes.includes(router.path)"></SideMenu>
  <CreatePost v-if="createPostVisible" @close-event="closeCreatePostWindow"></CreatePost>
  <router-view></router-view>
</template>

<script setup>
import SideMenu from './components/SideMenu.vue';
import CreatePost from './components/CreatePost.vue';
import {ref} from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();
const unwantedRoutes = ['/login','/create'];

const createPostVisible = ref(false);

function openCreatePostWindow(){
  createPostVisible.value = true;
  console.log('fired');
}
function closeCreatePostWindow(){
  createPostVisible.value = false;

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
  background:#f2f2f2;
}
</style>