<template>
  <GlobalPopup v-if="popTitle" :title="popTitle" :message="popMessage" @close-event="closePopup"></GlobalPopup>
  <section v-if="logSuccess">
    <GlobSucces ></GlobSucces>
  </section>
    <section v-else>
      <Transition name="fade">
      <form @keydown.enter="logUser" v-if="formVisible === true"> 
        <div class="formContent">
            <div class="title">
                <h1>Login</h1>
            </div>
          <div class="inputBox" :class="{wrong : formData.email.invalid === true}">
            <label for="email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
              </svg>
            </label>
            <input type="email" id="email" placeholder="Email" autocomplete="off" v-model="formData.email.value" @blur="formData.email.invalid = false">
          </div>
          <div class="inputBox" :class="{wrong : formData.password.invalid === true}">
            <label for="pass">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
              </svg>
            </label>
            <input type="password" id="pass" placeholder="Password" autocomplete="off" v-model="formData.password.value" @blur="formData.password.invalid = false">
          </div>
          <div class="formButton">
            <global-button title="submit" type="button" @click="logUser" ></global-button>
          </div>
          <div class="links">
            <p>Not a Member?</p>
            <router-link to="/create">Sign up now</router-link>
          </div>
        </div>
      </form>
    </Transition>
    </section>
  </template>
  
<script setup>
import GlobalButton from '../global/GlobalButton.vue';
import fetchService from '../services/fetchService';
import GlobSucces from '../global/GlobSucces.vue';
import GlobalPopup from '../global/GlobalPopup.vue';
import { useRouter } from 'vue-router';
import {onMounted, reactive,ref} from 'vue';
const router = useRouter();
const popTitle = ref('');
const popMessage = ref('');
const formVisible = ref(null)
const formData = reactive({
  email:{
    value: '',
    invalid: false
  },
  password:{
    value: '',
    invalid: false
  }
})

function checkInputs(){
  Object.keys(formData).forEach((key) => {
    if(formData[key].value === '' || formData[key].length < 5){
      formData[key].invalid = true;
    }else{
      formData[key].invalid = false;
    }
  })
}

const logSuccess = ref(false);

async function logUser(){
  checkInputs()
  const validationSuccessful = Object.keys(formData).some(key => formData[key].invalid);

  if(validationSuccessful){
    return
  }

  const body = {
    email: formData.email.value,
    password: formData.password.value,
  } 
  const response = await fetchService.post('/social_media/users/login', body);

  if(response){
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('loggedUserId', response.data.user.id);
    localStorage.setItem('userName', response.data.user.username);
    localStorage.setItem('profilePic', response.data.user.profile_picture);
    logSuccess.value = true;

    setTimeout(() => {
      router.push('/MainPage')
    }, 1500);
  }else{
    popTitle.value = 'Fail'
    popMessage.value = 'Something went wrong. Please try again!'
  }
}

function closePopup(){
  popTitle.value = '';
}
function showForm(){
  formVisible.value = true;
}

onMounted(() => {
  showForm()
})
</script>

  <style scoped>
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    form{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      background: #fff;
      padding: 77px  70px;
      width: 450px;
      box-shadow: 10px 10px 30px rgba(0,0,0,0.4);
      border-radius: 20px;
    }
    .formContent {
      display: flex;
      flex-direction: column;
      gap: 25px;
      width: 100%;
      height: 400px;
    }
    .title{
        text-align: center;
    }
    .inputBox {
      position: relative;
      margin-bottom: 20px;
    }
    .inputBox input {
      padding: 15px 40px 15px 15px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding-left: 50px;
      transition: 0.3s;
    }
    .inputBox label svg {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      max-height: 20px;
    }
    .formButton {
      text-align: center;
      margin-bottom: 30px;
    }
    .links{
      display: flex;
      justify-content: space-between;
      align-items: center
    }
    .links a{
      text-decoration: none;
      color:#007bff;
      font-weight: 500;
    }
    .wrong input{
      border: 1px solid red;
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

    @media (min-width: 374px){
      form{
        width: 350px;
        padding: 60px 40px;
      }
    }
    @media (min-width: 768px){
      form{
        width: 450px;
        padding: 60px 40px;
      }
    }
   
  </style>
  