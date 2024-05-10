<template>
  <InspectPostImages v-if="postId" :postId="postId" @close-window="closePost"></InspectPostImages>
  <UpdatePost v-if="postUpdatePostId" :postID="postUpdatePostId" @close-event="closeUpdatePostWindow"></UpdatePost>

  <section v-if="postData?.length" >
    <main>
      <!-- User Content -->
      <div class="userMenu" :class="{'expand' : element.commentsVisible}" v-for="element in postData" :key="element.id">
        <div class="postMenu" v-if="element.postMenuVisible">
          <ul v-for="user in allUsers" :key="user.id">
            <div v-if="element.author.id === user.id">
            <li>
              <p v-if="loggedUserId === element.author.id" @click="updatePostFunction(element.id)">Update Post</p>
              <p v-else @click="providePost(element.id)">View Post</p>
            </li>
            <li>
              <p @click="navigateToUser(user.id)">Show profile</p>
            </li>
            <li v-if="loggedUserId === element.author.id">
              <p  @click="deletePost(element.id)">Delete Post</p>
            </li>
          </div>
          </ul>
        </div>
        <!-- User Header -->
        <div class="userHeader"  v-for="user in allUsers" :key="user.id">
          <div class="userDesc" v-if="user.id === element.author.id" >
            <img :src="user.profile_picture" alt="User profile picture" @click="navigateToUser(user.id)">
            <p  @click="navigateToUser(user.id)">{{ user.username }}</p>
          </div>
          <div class="menu" v-if="user.id === element.author.id">
            <p @click="togglePostMenu(element.id)">...</p>
          </div>
        </div>

        <!-- Post Images -->
        <Swiper :modules="[Pagination]" :grabCursor="true" :pagination="{ clickable: true, }">
          <SwiperSlide  v-for="(image, index) in element.images" :key="index" @click="providePost(element.id)">
            <img :src="image" alt="Post Image" loading="lazy" >
          </SwiperSlide>
        </Swiper>
        <!-- Post likes -->
        <div class="buttonSection">
          <div class="leftSide">
          <div class="likeBtn" @click="likePost(element.id)">
            <svg v-if="!element.liked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
            <!-- liked -->
            <svg v-else  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#007bff" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
          </div>
          <div class="commentBtn">
            <svg @click="showComments(element.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
          </div>
        </div>
      <div class="rightSide">
        <div class="bookMark" @click="savePost(element.id)">
          <svg v-if="!element.saved" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#007bff"  d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
        </div>
      </div>
        </div>
        <!-- Post Description -->
        <div class="postDesc">
          <div class="title">
            <h3>{{ element.title }}</h3>
            <p>{{ element.description }}</p>
          </div>
        </div>
        <!-- Comment section -->
        <Transition name="commentAnimation">
      <div class="mainComment" v-if="element.commentsVisible">
        <div class="commentContent" >
          <div class="realComments" v-for="(comment, index) in element.postComments" v-bind:key="index">
              <h3>{{ comment.username }}: </h3>
              <p> {{ comment.comment }}</p>
          </div>
        </div>
        <div class="commentInpWrapper" >
          <div class="commentSection">
          <input id="comment" type="text" placeholder="Type something..." v-model="commentInput" autocomplete="off">
          <button @click="postComment(element.id)">Send</button>
        </div>
        </div>
      </div>
    </Transition>
      </div>
    </main>
  </section>
  <GlobalSpinner v-else></GlobalSpinner>
</template>

  
  <script setup>
  import fetchService from '../services/fetchService';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import GlobalSpinner from '../global/GlobalSpinner.vue';
  import InspectPostImages from '../components/InspectPostImages.vue';
  import UpdatePost from '../components/UpdatePost.vue';
  import { useStore } from 'vuex';
  // cube swiper
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import 'swiper/css/effect-cube';
  import 'swiper/css/pagination'
  import 'swiper/css';

  const store = useStore();
  const router = useRouter();
  const allUsers = ref([]);
  const postData = ref([]);
  const postId = ref(null);
  const commentInput = ref('');
  const postUpdatePostId = ref(null);
  const loggedUserId = localStorage.getItem('loggedUserId');

  async function getUsers() {
      const users = await fetchService.get('/social_media/users');
      store.dispatch('collectUsers', users.data.users)
      allUsers.value = store.state.allUsers;      
  }
  
  async function getContent() {
    const posts = await fetchService.get('/social_media/posts');
    const userID = localStorage.getItem('loggedUserId');
    const postsRecieved = posts.data.posts.map(post => {
      const liked = post.likes.some(postLike => postLike.user_id === userID);
      return { ...post, liked, commentsVisible: false, saved: false, postComments: [], postMenuVisible: false};
    });
    //set content in VUEX
    store.dispatch('collectData', postsRecieved);
    postData.value = store.state.postData;
  }
  
async function likePost(id) {
  const post = postData.value.find(post => post.id === id);
  post.liked = !post.liked;
  const response = await fetchService.post(`/social_media/posts/like/${id}`);
  console.log(response);
}
async function savePost(id){
  const post = postData.value.find(post => post.id === id);
  post.saved = !post.saved;

}
//creating a comment for our post
async function postComment(postId){
  const userId = localStorage.getItem('loggedUserId');
  const username = localStorage.getItem('userName');
  const findPostIndex = postData.value.findIndex((post) => post.id === postId);

  try {
    const response = await fetch('https://socialmedia-17276-default-rtdb.europe-west1.firebasedatabase.app/comments.json', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        postId: postId,
        comment: commentInput.value,
        userName: username,
        userId: userId
      })
    });

    if(response.ok){
      const newComment = {
        comment: commentInput.value,
        username: username
      };

      if(findPostIndex !== -1){
        postData.value[findPostIndex].postComments.push(newComment);
      }

      commentInput.value = '';
    } else {
      throw new Error('Could not fetch this data!');
    }
  } catch(error) {
    console.error(error);
  }
}


async function showComments(postId){
  //find post and set commentsVisible to true 
  const post = postData.value.find(post => post.id === postId);
  console.log(postData.value);
  setTimeout(() => {
    post.commentsVisible = !post.commentsVisible;
  }, 100);
  post.postComments = [];

  //fetch firebase and find comments for our post
  try{
    const response = await fetch('https://socialmedia-17276-default-rtdb.europe-west1.firebasedatabase.app/comments.json');

  if(response.ok){
    const responseData = await response.json();

    Object.keys(responseData).forEach((key) => {
      if(responseData[key].postId === postId){
       post.postComments.push({
        comment: responseData[key].comment,
        username: responseData[key].userName
       })
      }
    })
  }else{
    throw new Error('Problem while fetching!!!')
  }
  }catch(error){
    console.error(error);
  }
}

function providePost(id){
  postId.value = id;
}
function closePost(){
  postId.value = null;

}
function navigateToUser(id){
  router.push(`/user/${id}`)
}
//update post open/close
function updatePostFunction(postId){
    postUpdatePostId.value = postId;
  }
function closeUpdatePostWindow(){
    postUpdatePostId.value = false;
}

function togglePostMenu(id){
 const find = postData.value.find((element) => element.id === id);
 find.postMenuVisible = !find.postMenuVisible
}

async function deletePost(postId){
  const response = await fetchService.delete(`/social_media/posts/${postId}`);
  if(response){
    const findPost = postData.value.findIndex((post) => post.id === postId);
    if(findPost){
      postData.value.splice(findPost,1)
    }
    else{
      return
    }
  }
}

  onMounted(() => {
      getUsers();
      getContent();
  });
  </script>

<style scoped>
section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userMenu {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  transition: height 0.3s;
}

.postMenu {
  position: absolute;
  z-index: 5;
  background-color: #fff;
  padding: 15px 10px;
  right: 4%;
  top: 12%;
  border-radius: 7px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5); 
}

.postMenu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.postMenu ul li {
  margin-bottom: 5px; 
  border-radius: 5px;
}

.postMenu ul li {
  margin: 0;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s; 
}
.postMenu ul li p{
  font-weight: 600;
}
.postMenu ul li:hover  {
  background-color: rgba(0, 123, 255, 0.2); 
}

.userHeader {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px; 
}

.userDesc {
  display: flex;
  align-items: center;
}

.userDesc img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px; 
  border: 2px solid #ccc; 
  cursor: pointer;
  object-fit: cover;
}
.userDesc p{
  cursor: pointer;
  font-weight: 600;
}

.menu p {
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  display: inline-block; 
  margin-top: 10px;
}

.userHeader .menu p {
  transform: rotate(90deg);
}

.swiper-slide img, .swiper-slide-active img, .swiper-slide{
  border-radius: 5px;
}

.post {
  margin-bottom: 20px;
  border: 1px solid #ccc; 
  border-radius: 10px;
  padding: 20px; 
}

.title {
  margin-bottom: 10px; 
}

.title h3 {
  margin-bottom: 5px; 
  color: #333; 
}

.title p {
  color: #666; 
}
.postDesc{
  margin-bottom: 20px; 
  border-bottom: 1px solid #ccc; 
}
.swiper {
  overflow: hidden;
  width: 100%;
  height: 350px;
}
.swiper img{
  object-fit: cover; 

}
.buttonSection{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
}
.buttonSection svg{
  height: 25px;
  cursor: pointer;
}
.leftSide{
  display: flex;
  gap: 10px;
}
/* comments */
.mainComment {
  height: 150px;
  transition: max-height 0.4s ease; 
  overflow-y: auto; 
}

.commentSection {
  width: 100%;
  position: relative;
  padding: 10px;
  background: rgba(0, 123, 255, 0.2); 
  border-radius: 10px;
}
.commentContent{
  margin-bottom: 10px;
}
.commentContent h3, p{ 
  display: inline;
  font-size: 15px;
}

.commentSection input {
  width: calc(100% - 60px); 
  height: 40px;
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #007bff;
  margin-right: 10px;
  outline: none;
}
.commentSection input::placeholder{
  color: #007bff
}
.commentSection button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 36px; 
  padding: 0 10px; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.commentSection button:hover {
  background-color: #0056b3;
}
@media (min-width: 374px){
  .userMenu{
    max-width: 360px;
    height: 550px;
  }
  .userMenu.expand {
    height: 610px; 
  }
}
@media (min-width: 767px){
  .userMenu{
    max-width: 450px;
    height: 600px;
  }
  .userMenu.expand {
    height: 650px; 
}
}

/* comment animation */

.commentAnimation-enter-from{
  opacity: 0;
  transform: translateY(-100px);
}
.commentAnimation-enter-active{
  transition: 0.4s all ease;
}
.commentAnimation-enter-to{
  opacity: 1;
  transform: translateY(0px);
}

.commentAnimation-leave-from{
  opacity: 1;
  transform: translateY(0px);
}
.commentAnimation-leave-active{
  transition: 0.4s all ease;
  
}
.commentAnimation-leave-to{
  opacity: 0;
  transform: scale(0.7);
}
</style>

  