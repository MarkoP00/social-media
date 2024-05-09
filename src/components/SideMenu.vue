<template>  
<div class="mobileButton" @click="openBigMenuOnMob">
    <div @click="openBigMenuOnMob"></div>
    <div @click="openBigMenuOnMob"></div>
    <div @click="openBigMenuOnMob"></div>
</div>
    <section :class="{'formActive' : menuActive}">
        <div class="sideMenuContent" >
            <div class="topSide">
                <div class="logo" >
                        <div class="open" v-if="!menuActive" @click="openMenu">
                            <div class="image" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                            </div>
                        <div class="text">
                                <h3>Menu</h3>
                        </div>
                    </div>
                    <div class="close" v-else @click="closeMenu">
                        <div class="image" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                        </div>
                        <div class="text">
                            <h3>Close menu</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="middleSide" >
                <div class="home" @click="navigateToHome">
                    <div class="image" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                    </div>
                    <div class="text">
                        <p>Home</p>
                    </div>
                </div>
                <div class="createPost"  @click="openCreateWindow">
                    <div class="image"  >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#0758af" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                    </div>
                    <div class="text" @click="openCreateWindow">
                        <p @click="openCreateWindow">Create post</p>
                    </div>
                </div>
                <div class="userProfile" @click="navigateToUser">
                    <div class="image" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    </div>
                    <div class="text">
                        <p>Profile</p>
                    </div>
                </div>
            </div>
            <div class="bottomSide">
                <div class="userImage" >
                    <div class="image">
                        <img :src="userImage" alt="profile image" @click="navigateToUser">
                    </div>
                    <div class="text">
                        <p>{{username}}</p>
                    </div>
                </div>
                <div class="logout">
                    <div class="image" @click="logOut">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                    </div> 
                    <div class="text" @click="logOut">
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineEmits,ref } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter();

    const emits = defineEmits(['open-create']);

    function openCreateWindow(){
        emits('open-create')
    }

    const userImage = localStorage.getItem('profilePic');
    const username = localStorage.getItem('userName');
    const menuActive = ref(false);
    

 function openMenu(){
    menuActive.value = true;
 }
 function closeMenu(){
    menuActive.value = false;
}

function navigateToHome(){
    router.push('/MainPage')
}
function navigateToUser(){
    router.push(`/user/${localStorage.getItem('loggedUserId')}`)
}
function logOut(){
    localStorage.removeItem('profilePic');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUserId');
    
    router.push('/login') 
}
function openBigMenuOnMob(){
    const section = document.querySelector('section');

    section.classList.add('opened')
    menuActive.value = true;

}
</script>

<style scoped>
     section{
        position: fixed;
        top: 0;
        left: 0;
        width: 100px;
        background-color: #fff;
        height: 100%;
        transition: 0.3s all;
        z-index: 11;
    }
    .sideMenuContent{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        height: 100%;
        font-size: 17px;
        position: relative;
        width: 100%;
        transition: 0.3s all;
        gap: 40px;
    }
    .sideMenuContent p, h3{
        display: none;
    }
    
    .topSide, .middleSide, .bottomSide{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        transition: 0.3s all;
    }
    .logo .open,.logo .close, .home, .userProfile, .createPost,.userImage, .logout{
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 10px;
        padding: 10px;
        border-radius: 50px;
        transition: 0.3s all;
        cursor: pointer;
    }
    .home:hover, .userProfile:hover, .createPost:hover,.userImage:hover, .logout:hover{
        cursor: pointer;
        transform: scale(1.2);
    }
    .userImage {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 10px;
    padding: 10px;
    border-radius: 50px;
    transition: 0.3s all;
    margin-right: 0; 
    margin-left: auto; 
}
    .userImage .image img{
        margin-top: 20px;
        width: 50px;
        height: 50px;
    }
    .userImage .image{
        height: 70px;
        margin-right: 5px;
    }
    .image{
        width: 50px;
        height: 50px;
    }
    .image svg{
        width: 80%;
        height: 80%;
        margin-left: 15px;
    }
    .image img{
        width: 100%;
        height: 65%;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
    }
   /* styles when from is active */

   .formActive{
        width: 300px;
    }
    .formActive .sideMenuContent{
        border-right: 2px solid rgba(0, 123, 255, 0.7)
    }
    .formActive .home:hover, .formActive .userProfile:hover,.formActive .createPost:hover,.formActive .userImage:hover, .formActive .logout:hover{
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transform: scale(1.2);
    }
    .formActive .sideMenuContent p,
    .formActive h3 {
        display: block;
    }
    .formActive .sideMenuContent .userImage .image img{
        margin-top: 0px;
    }
    .formActive .userImage{
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 10px;
        padding: 10px;
        border-radius: 50px;
        transition: 0.3s all;
    }
    .formActive .sideMenuContent .image{
        width: 50px;
        height: 50px;
    }
    .formActive .sideMenuContent .image img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .formActive .sideMenuContent .middleSide{
        gap: 20px;
    }
    .mobileButton{
        position: fixed;
        top: 1%;
        left: 2%;
        z-index: 10;
        cursor: pointer;
        background: rgba(0, 123, 255, 0.5);
        padding: 10px;
        border-radius: 20px;
    }
    .mobileButton div{
        width: 35px;
        height: 5px;
        background-color: black;
        margin: 6px 0;
        border-radius: 20px;
    }
    .opened{
            display: inline;
            visibility: visible;
            opacity: 1;
            transition: 0.3s all;
    }
    @media (min-width: 374px){
        section{
            display: none;
            visibility: hidden;
            opacity: 0;
        }
        .formActive .home:hover, .formActive .userProfile:hover,.formActive .createPost:hover,.formActive .userImage:hover, .formActive .logout:hover{
        background-color: transparent;
        cursor: pointer;
        transform: scale(1);
    }
    }
    @media (min-width: 767px){
        section{
            display: inline;
            visibility: visible;
            opacity: 1;
        }
        .mobileButton{
            display: none;
            visibility: hidden;
            opacity: 0;
        }
    }
</style>