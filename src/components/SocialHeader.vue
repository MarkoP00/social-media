<template>
    <section>
    <div class="sidebar">
        <ul>
            <li class="logo" >
                <a href="#">
                    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg></div>
                    <div class="text">Website Logo</div>
                </a>
            </li>
            <div class="menuList">
             <li  @click="activateMenuItem('home')" :class="{ 'active': formOfData.home.active }">
                <a href="#">
                    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></div>
                    <div class="text">Home</div>
                </a>
             </li>
             <li  @click="activateMenuItem('user')" :class="{ 'active': formOfData.user.active }">
                <a href="#">
                    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></div>
                    <div class="text">Profile</div>
                </a>
             </li>
             <li @click="activateMenuItem('message')" :class="{ 'active': formOfData.message.active }">
                <a href="#">
                    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg></div>
                    <div class="text">Inbox</div>
                </a>
             </li>
             <li style="--bg:#2196f3;" @click="activateMenuItem('graphic')" :class="{ 'active': formOfData.graphic.active }">
                <a href="#">
                    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg></div>
                    <div class="text">Analystics</div>
                </a>
             </li>
             <div class="bottom">
                <li class="user">
        <a href="#">
            <div class="icon">
                <div class="imgBx">
                    <img src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg" alt="">
                </div>
            </div>
            <div class="text">Username</div>
        </a>
    </li>
                 <li >
                    <a href="#">
                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg></div>
                        <div class="text">Logout</div>
                    </a>
                 </li>
             </div>
             
            </div>
        </ul>
    </div>
</section>

  </template>
  
  <script setup>
  import {reactive} from 'vue';

  const formOfData = reactive({
    home: {
        active: true,
    },
    user:{
        active: false,
    },
    message: {
        active: false,
    
    },
    graphic: {
        active: false
    }
  })

  const activateMenuItem = (menuItem) => {
        for (const key in formOfData) {
            if (Object.hasOwnProperty.call(formOfData, key)) {
                if (key === menuItem) {
                    formOfData[key].active = true;
                } else {
                    formOfData[key].active = false;
                }
            }
        }
    };
</script>
  
  <style scoped>
  section{
    position: fixed;
    top: 0;
    z-index: 9999;
  }
  .sidebar{
    position: absolute;
    width: 80px;
    height: 100vh;
    background-color: #fff;
    transition: all 0.5s ;
    padding-left: 10px;
    color:#000;
    overflow: hidden;
}
.sidebar:hover{
    width: 300px;
}
.sidebar ul{
    position: relative;
    height: 100vh;
}
.sidebar ul li{
    position: relative;
    list-style: none;
    padding: 10px;
}
.logo{
    margin-bottom: 120px;
}

.sidebar ul li a{
    position: relative;
    text-decoration: none;
    display: flex;
    white-space: nowrap;
    text-decoration: none;
}
.sidebar ul li .logo{
    margin-bottom: 50px;
}
.sidebar ul li.logo .icon{
    font-size: 2rem;
}
.sidebar ul li.logo .text{
    font-size: 1.2em;
    font-weight: 500;
}
.sidebar ul li.active{
    background-color: #007bff;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
}
.active{
    transition: 0.15s all ;
}
.sidebar ul li.active::before{
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: -20px;
    right: 0;
    border-bottom-right-radius: 20px;
    background: transparent;
    box-shadow: 5px 5px 0 5px #007bff;
}
.sidebar ul li.active::after{
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -20px;
    right: 0;
    border-top-right-radius: 20px;
    background: transparent;
    box-shadow: 5px -5px 0 5px #007bff
}
.sidebar ul li a .icon{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    font-size: 1.5em;
    color:#333;
    transition: all 0.5s ;
}
.sidebar ul li.active a .text{
    color:#fff;
}
.sidebar ul li a .text{
    position: relative;
    height: 70px;
    display: flex;
    align-items: center;
    font-size: 1em;
    color: #333;
    padding-left: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.5s ;
}

.bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
}
.user {
    display: flex;
    align-items: center; 
}

.imgBx {
    width: 50px; /* Smanjivanje veličine okvira za sliku */
    height: 50px;
    margin-right: 10px; /* Dodatni razmak između slike i teksta */
}

.imgBx img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

  /* main {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
  }
  header {
    position: relative;
    padding: 20px 20px;
    display: flex;
    justify-content: left;
    gap: 100px;
    align-items: left;
    flex-direction: column;
  }
  .logo{
    text-align: center;
  }
  .image{
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .image img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .image p{
    display: inline;
  }
  .otherElements{
    display: flex;
    flex-direction: column;
    gap: 50px;
  }


  .glow-on-hover {
  width: 220px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: rgb(17, 17, 17);
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.glow-on-hover:before {
  content: '';
  background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing_54134 20s linear infinite;
  opacity: 0;
  transition: opacity .3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #000
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing_54134 {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
} */
  </style>
  