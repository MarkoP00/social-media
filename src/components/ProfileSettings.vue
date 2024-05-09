<template>
    <section @click="closePopup">
      <GlobSucces v-if="successMark"></GlobSucces>
      <GlobFail v-if="failMark"></GlobFail>
      <Transition name="popup">
        <main v-if="popupVisible" @click.stop>
          <div class="settings">
            <div class="title">
              <button class="cancel-btn" @click="closePopup">Cancel</button>
              <h3>Edit Profile</h3>
              <button class="done-btn" @click="submitChanges">Done</button>
            </div>
            <div class="profileImages">
                <div>
                     <img :src="settingsData.imageLink.userData" alt="Current profile picture">
                     <p class="image-label">{{ settingsData.username.userData }}</p>
                </div>
                <div >
                    <img :src="settingsData.imageLink.value !== '' ? settingsData.imageLink.value : settingsData.imageLink.fallBackPic" alt="New profile picture">
                    <p class="image-label">{{ settingsData.username.value !== '' ? settingsData.username.value : 'New username'}}</p>
                </div>
            </div>
            <div class="editInfo">
              <p>Change your Username/Profile Image</p>
            </div>
            <div class="inputField">
              <label for="username">New Username (5 - 18 characters)</label>
              <input type="text" maxlength="18" id="username" placeholder="Enter your new username / Leave empty to keep current" autocomplete="off" v-model="settingsData.username.value" :class="{ wrong : settingsData.username.invalid === true }" @blur="settingsData.username.invalid = false"> 
            </div>
            <div class="inputField">
              <label for="profPic">New Profile Picture (image URL)</label>
              <input type="text" id="profPic" placeholder="Enter the URL of your new profile picture / Leave empty to keep current" autocomplete="off" v-model="settingsData.imageLink.value" :class="{ wrong : settingsData.imageLink.invalid === true }" @blur="settingsData.imageLink.invalid = false"> 
            </div>
            <div class="settingsBtn">
              <GlobalButton title="Submit" @click="submitChanges"></GlobalButton>
            </div>
          </div>
        </main>
      </Transition>
    </section>
  </template>
  

<script setup>
    import GlobalButton from '../global/GlobalButton.vue';
    import {defineEmits, ref, onMounted, reactive} from 'vue';
    import fetchService from '../services/fetchService';
    import GlobSucces from '../global/GlobSucces.vue';
    import GlobFail from '../global/GlobFail.vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    const store = useStore();
    const route = useRoute();
    const userId = route.params;

    const emit = defineEmits(['close-popup'])
    const popupVisible = ref(null);
    const failMark = ref(false);
    const successMark = ref(false);

    const settingsData = reactive({
        username: {
            value: '',
            invalid: false,
            userData: store.state.singleUser.username
        },
        imageLink: {
            value: '',
            invalid: false,
            userData: store.state.singleUser.profile_picture,
            fallBackPic: 'https://www.kindpng.com/picc/m/69-691018_blank-profile-picture-gmail-hd-png-download.png'
        }
    })


    async function submitChanges(){
        settingsData.username.invalid = false;
        settingsData.imageLink.invalid = false;
        const userNameValue = settingsData.username.value;
        const imageValue = settingsData.imageLink.value

        if(!userNameValue  && !imageValue){
            settingsData.username.invalid = true;
            settingsData.imageLink.invalid = true;
        }else if(userNameValue && (userNameValue.length < 5 || userNameValue.length > 18)){
            return settingsData.username.invalid = true;
        }
        else if(!userNameValue && imageValue){
            const userName = settingsData.username.userData
            localStorage.setItem('profilePic', imageValue);
            const body = {username: userName, profile_picture: settingsData.imageLink.value, id: userId};
            const response = await fetchService.patch('/social_media/users', body);
            checkInputs(response);
            if(response !== undefined){
              store.dispatch('collectSingleUser', response.data.user)
            }else{
              alert('Something went wrong. Please try again :(')
            }
        }
        else if(userNameValue  && !imageValue){
            const profilePic = settingsData.imageLink.userData;
            localStorage.setItem('userName', userNameValue);
            const body = {username: settingsData.username.value, profile_picture: profilePic, id: userId};
            const response = await fetchService.patch('/social_media/users', body);
            checkInputs(response);
            if(response !== undefined){
              store.dispatch('collectSingleUser', response.data.user)
            }else{
              alert('Something went wrong. Please try again :(')
            }
           
        }else{
            const body = {username: userNameValue, profile_picture: imageValue};
            const response = await fetchService.patch('/social_media/users', body);
            checkInputs(response);
            if(response !== undefined){
              store.dispatch('collectSingleUser', response.data.user)
            }else{
              alert('Something went wrong. Please try again :(')
            }
      }
}
   

    function closePopup(){
        popupVisible.value = false;

        setTimeout(() => {
            emit('close-popup')
        }, 300);
    }
    function showPopup(){
        popupVisible.value = true;
    }

    function checkInputs(response){
        if(response !== undefined){
                popupVisible.value = false;
                setTimeout(() => {
                    successMark.value = true;
                }, 500);
                setTimeout(() => {
                    emit('close-popup')
                }, 2000);
            }else{
                popupVisible.value = false;
                setTimeout(() => {
                    failMark.value = true;
                }, 500);
                setTimeout(() => {
                    emit('close-popup')
                }, 2000);
            }
    }
   
    onMounted(() => {
        showPopup()
    })
</script>

<style scoped>
  section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 12;
}

.settings {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  gap: 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}

.profileImages {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.profileImages img {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
}
.image-label {
    text-align: center;
    margin-top: 5px;
    font-size: 15px;
    color: #777;
    
}

.editInfo {
  text-align: center;
  margin: 5px;
  letter-spacing: 1px;
}

.inputField {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 5px;
}

input:focus {
  outline: none;
  border-color: #6d6dff;
  box-shadow: 0 0 5px rgba(109, 109, 255, 0.5);
}

.wrong {
  border-color: red;
}

.cancel-btn,
.done-btn {
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

.cancel-btn:hover,
.done-btn:hover {
  background-color: #f0f0f0;
}

.popup-enter-from, .popup-leave-to{
    transform: scale(0.7);
    opacity: 0;
 }
 .popup-enter-active, .popup-leave-active{
    transition: 0.3s all ease;
 }  
 .popup-enter-to, .popup-leave-from{
    transform: scale(1);
    opacity: 1;
 }

@media(min-width: 374px){
.settings {
     max-width: 360px;
}
.profileImages img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}
}
@media(min-width: 550px){
.settings {
     max-width: 100%;
}
.profileImages img {
  width: 170px;
  height: 170px;
}
}
</style>
