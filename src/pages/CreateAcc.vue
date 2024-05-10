<template>
  <GlobalPopup @close-event="closePopup" v-if="popTitle" :title="popTitle" :message="popMessage"></GlobalPopup>
  <GlobalSpinner v-if="spinnerIsActive" style="background-color: rgba(0,0,0,0.2);"></GlobalSpinner>
    <section>
      <Transition name="fade">
      <form :class="{errorActive : errorActive}" @keydown.enter="createUser" v-if="formVisible">
        <div class="formContent" >
            <div class="title">
                <h1>Create account</h1>
            </div>
            <div class="inputBox" :class="{wrong : formData.username.invalid}">
            <label for="username">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
            </label>
            <input type="text" id="username" placeholder="Username" autocomplete="off" v-model="formData.username.value" @blur="formData.username.invalid = false">
          </div>
          <div class="inputBox" :class="{wrong : formData.email.invalid}">
            <label for="email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
              </svg>
            </label>
            <input type="email" id="email" placeholder="Email" autocomplete="off" v-model="formData.email.value" @blur="formData.email.invalid = false">
          </div>
          <div class="inputBox" :class="{wrong : formData.password.invalid}">
            <label for="pass">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
              </svg>
            </label>
            <input type="password" id="pass" placeholder="Password" autocomplete="off" v-model="formData.password.value" @blur="formData.password.invalid = false">
          </div>
           <div class="inputBox" :class="{wrong : formData.confirm.invalid}" >
            <label for="confirm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>
            </label>
            <input type="password" id="confirm" placeholder="Confirm Password" autocomplete="off" v-model="formData.confirm.value" @blur="formData.confirm.invalid = false">
          </div>
          <div>
            <p v-if="errorActive === true" style="color:red">Please correct the input fields (5-20 chars). Email must include @ symbol</p>
          </div>
          <div class="formButton">
            <global-button title="create" type="button" @click="createUser"></global-button>
          </div>
          <div class="links">
            <p>Have an account?</p>
            <router-link to="/login">Login</router-link>
          </div>
        </div>
      </form>
    </Transition>
    </section>
  </template>


<script setup>
import GlobalButton from '../global/GlobalButton.vue';
import fetchService from '../services/fetchService';
import GlobalSpinner from '../global/GlobalSpinner.vue';
import GlobalPopup from '../global/GlobalPopup.vue';
import {onMounted, reactive,ref} from 'vue';

const errorActive = ref(false);
const popTitle = ref('');
const popMessage = ref('');
const spinnerIsActive = ref(false);
const formVisible = ref(null);
const formData = reactive({
  username: {
    value: '',
    invalid: false
  },
  email:{
    value: '',
    invalid: false
  },
  password:{
    value: '',
    invalid: false
  },
  confirm:{
    value: '',
    invalid: false
  },
})

function validateInputFields(){
  let invalidInput = false;

  Object.keys(formData).forEach((key) => {
    if(formData[key].value === '' || formData[key].value.length < 5 || formData[key].value.length > 20){
      formData[key].invalid = true;
      invalidInput = true;
    }else{
      formData[key].invalid = false;
    }
  });

  if (!formData['email'].value.includes('@')){
      formData['email'].invalid = true;
      invalidInput = true;
    } if(formData['password'].value !== formData['confirm'].value) {
    formData['password'].invalid = true;
    formData['confirm'].invalid = true;
    invalidInput = true;
  }
  if(invalidInput) {
    errorActive.value = true;
  }
}

async function createUser(){
  errorActive.value = false;
  validateInputFields();

  const validationSuccessful = Object.keys(formData).some(key => formData[key].invalid)
  spinnerIsActive.value = true;
  
  if(validationSuccessful){
  spinnerIsActive.value = false;

    return
  }

  const body = {
    username: formData.username.value,
    email: formData.email.value,
    password: formData.password.value,
    profile_picture: 'https://e7.pngegg.com/pngimages/419/473/png-clipart-computer-icons-user-profile-login-user-heroes-sphere-thumbnail.png'
  };
  
  const user = await fetchService.post('/social_media/users', body);

  if(user === undefined){
    spinnerIsActive.value = false;
    popTitle.value = 'Fail';
    popMessage.value = 'Oops! Please try again';

  }else if(user){
    spinnerIsActive.value = false;
    popTitle.value = 'Success';
    popMessage.value = 'You have successfully created your account. Please proceed to login!';
  }
}

function closePopup(){
  popTitle.value = ''
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
  gap: 20px;
  width: 100%;
  height: 550px;
}
.title{
  text-align: center;
}
.inputBox {
  position: relative;
  margin-bottom: 20px;
}
.errorActive {
  padding: 87px  70px;
} 
.errorActive .formContent{
  margin-bottom: 20px;
}
.errorActive .inputBox:nth-child(5){
  margin-bottom: 0;
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
  margin-bottom: 20px;
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

@media (max-width: 426px){
  form{
    width: 350px;
    padding: 60px 40px;
  }
  .formButton{
  margin-bottom: 10px;

  }
  .inputBox:nth-child(5){
  margin-bottom: 0;
  }
  .errorActive {
  padding: 70px 40px;
} 
}

</style>
