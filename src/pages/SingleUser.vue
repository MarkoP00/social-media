<template>
    <ProfileSettings v-if="profileSetingsVisible" @close-popup="toggleShowSettings" :userId="props.userId"></ProfileSettings>
    <!-- <SelectedPost v-if="postId" :postId="postId" @close-post="closePost"></SelectedPost> -->
    <InspectPostImages v-if="postId" :postId="postId" @close-window="closePost"></InspectPostImages>
    <section> 
            <div class="userHeaderContent" >
                <div class="profileImage" >
                    <img :src="userData.profile_picture" alt="not found">
                </div>
                <div class="userSocialInfo">
                    <div class="aboutUser">
                        <h3>{{ userData.username }}</h3>
                        <button v-if="followingUser" @click="followUser(userData._id)" style="background-color: #d8d4d4; color: #007bff; font-weight: 700;">Unfollow</button>
                        <button v-if="!followingUser && !sameUser" @click="followUser(userData._id)">Follow</button>
                        <button  @click="goBack">Go Back</button>
                        <button v-if="sameUser" @click="toggleShowSettings">Change Profile</button>
                    </div>
                    <div class="socialInfo">
                        <p>Posts {{ userPostData.length }}</p>
                        <p>Followers {{ userData.followers ? userData.followers.length : 0}}</p>
                        <p>Following {{ userData.following ? userData.following.length : 0 }}</p>
                    </div>
                    <div class="email">
                        <p>{{ userData.email }}</p>
                    </div>
                </div>
            </div>

            <!-- mobile view -->
            <div class="mobileMain">
            <div class="userMobHeader">
                <div class="profImg">
                    <img :src="userData.profile_picture" alt="not found">
                    <h3>{{ userData.username }}</h3>
                </div>
                <div class="userMobFollowers">
                        <p>Posts <br> {{ userPostData.length }}</p>
                        <p>Followers <br>{{ userData.followers ? userData.followers.length : 0}}</p>
                        <p>Following <br> {{ userData.following ? userData.following.length : 0 }}</p>
                </div>
            </div>
                <div class="userMobButtons">
                    <div>
                        <button v-if="followingUser" @click="followUser(userData._id)" style="background-color: #d8d4d4; color: #007bff; font-weight: 700;">Unfollow</button>
                        <button v-if="!followingUser && !sameUser" @click="followUser(userData._id)">Follow</button>
                    </div>
                    <div>
                        <button  @click="goBack">Go Back</button>
                        <button v-if="sameUser" @click="toggleShowSettings" style="margin-left: 20px;">Change Profile</button>
                    </div>
                </div>
        </div>
    </section>
 
    <section>
        <div class="postWrapper">
            <p v-if="userPostData.length === 0">Please, create your first post!</p>
            <ul class="postList" v-if="userPostData?.length">
                <li v-for="element in userPostData" :key="element.id">
                    <div class="image" v-for="(image, index) in element.images" :key="image" @click="providePostId(element.id)">
                        <img v-if="index === 0" :src="image" alt="" >
                    </div>
                </li>
            </ul>
        </div>
    </section>

    <GlobalSpinner v-if="loading" style="background-color:rgb(0, 0, 0,0.8);"></GlobalSpinner>
</template>

<script setup>
import { defineProps, ref, onMounted, computed, watch } from 'vue';
import fetchService from '../services/fetchService';
import ProfileSettings from '../components/ProfileSettings.vue';
import InspectPostImages from '../components/InspectPostImages.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import GlobalSpinner from '../global/GlobalSpinner.vue';
const store = useStore();
const props = defineProps({
    userId: String
});
const router = useRouter();
const userData = ref({});
const userPostData = ref([]);
const sameUser = ref(null);
const profileSetingsVisible = ref(false);
const followingUser = ref(false);
const postId = ref(null);
const loading = ref(true);
//react on data changes
const signleUserNameChange = computed(() => store.getters.checkSingleUserChanges);
const signleUserProfilePictureChange = computed(() => store.getters.checkSUProfilePicture);
watch(signleUserNameChange, (newValue) => {
    userData.value.username = newValue;
});
watch(signleUserProfilePictureChange, (newValue) => {
    userData.value.profile_picture = newValue;
})

async function getUser() {
    const users = await fetchService.get(`/social_media/users/${props.userId}`);

    store.dispatch('collectSingleUser', users.data.user)
    userData.value = store.state.singleUser;

    const followers = userData.value.followers;
    followers.forEach((follower) => {
        if(follower.id === localStorage.getItem('loggedUserId')){
            followingUser.value = true;
        }
    })
    
}

async function getUserPost() {
    const posts = await fetchService.get('/social_media/posts');
    const foundPosts = [];
    posts.data.posts.forEach((key) => {
        if(key.author.id === props.userId){
            foundPosts.push(key)
        }
    })
    userPostData.value = foundPosts
    loading.value = false;
}

async function followUser(userID){
    const response = await fetchService.post(`/social_media/users/follow/${userID}`);
    console.log(response);
    followingUser.value = !followingUser.value;

    getUser()
}

function checkUser(){
    const loggedId = localStorage.getItem('loggedUserId');
    if(props.userId === loggedId){
        sameUser.value = true;
    }else{
        sameUser.value = false;
    }
}
function toggleShowSettings(){
    profileSetingsVisible.value = !profileSetingsVisible.value;
}
function goBack(){
    router.push('/MainPage');
}
function providePostId(id){
    postId.value = id;
}
function closePost(){
    postId.value = null;

}
onMounted(() => {
    checkUser();
    getUser();
    getUserPost();
});
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    min-height: 20vh;
    align-items: center;
    flex-direction: column;
}
.userHeaderContent {
  width: 100%;
  max-width: 900px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid #ccc;
}

.profileImage {
  width: 170px;
  height: 170px;
}

.profileImage img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.userSocialInfo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
}

.aboutUser {
  display: flex;
  align-items: center;
  gap: 10px;
}

.aboutUser button {
  padding: 8px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  transition: 0.3s all;
  cursor: pointer;
}

.aboutUser button:hover {
  background-color: #0056b3;
}



.socialInfo {
  display: flex;
  gap: 10px;
}
/* mobile view */
.mobileMain{
    display: none;
    visibility: hidden;
    opacity: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 20px;
}
.userMobHeader{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
}
.profImg{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.profImg img{
    width: 80px;
    height: 80px;
    border-radius: 40px;
  object-fit: cover;

}
.userMobFollowers{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
.userMobButtons{
    display: flex;
    gap: 20px;
}
.userMobButtons button{
  padding: 8px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  transition: 0.3s all;
  cursor: pointer;
  width: 120px;
}
.userMobButtons button:hover {
  background-color: #0056b3;
}
/* posts */
.postWrapper{
    margin-top: 50px;
}
.postWrapper img{
    object-fit: cover;
}
.postWrapper p{
    text-align: center;

}
.postList{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.postList li{
    width: 425px; 
    /* stavi ovde 325px */
    border-radius: 8px;
    margin: 20px;
    transition: 0.2s;
    cursor: pointer;
}
.image img{
    width: 100%;
    height: 300px;
    /* ovde 250px */
    border-radius: 10px;
    position: relative;
}

@media (min-width: 374px){
    .mobileMain{
        display: flex;
        visibility: visible;
        opacity: 1;
    }
    .userHeaderContent{
        display: none;
        visibility: hidden;
        opacity: 0;
    }
    .postWrapper{
        margin-top: 0px;
    }
    
}
@media (min-width: 767px){
    .mobileMain{
        
        display: none;
        visibility: hidden;
        opacity: 0;
    }
    .userHeaderContent{
        display: flex;
        visibility: visible;
        opacity: 1;
    }
    .postWrapper{
        margin-top: 50px;
    }
}
</style>
